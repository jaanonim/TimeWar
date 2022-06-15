const Map = require("./Map");
const Figures = require("./Figures");
const Player = require("./Player");
const { runWhenUnlock } = require("../utils/asyncSync");

//TODO: move to some settings
const KICK_TIME = 60; // in seconds
const BASE_TURN_TIME = 3600; //45; // in seconds
const STEP_TIME = 0; //15; // in seconds
const MAX_TURN_TIME = 1000000; //300; // in seconds
const BASE_STEP_SIZE = 10; // in units in game (for both players)
const MAX_STEP_SIZE = 50; // in units in game (for both players)
const STEP_SIZE_STEP = 7; // in units in game (for both players)

module.exports = class Room {
    constructor(name, settings) {
        this.settings = settings;
        this.name = name;
        this.winTarget = settings.playerTarget;
        this.bluePlayer = null;
        this.redPlayer = null;
        this.isStartGame = false;
        this.turn = "RED";
        this.timer = -1;
        this.hasMoved = false;
        this.map = new Map(this);
        this.figures = new Figures();
    }

    get currentPlayer() {
        return this.turn === "RED" ? this.redPlayer : this.bluePlayer;
    }

    get currentTurnTimer() {
        let figuresCount = this.map.figures.length;
        let stepSize = BASE_STEP_SIZE;
        let steps = 0;
        while (stepSize < figuresCount) {
            steps++;
            figuresCount -= stepSize;
            stepSize += STEP_SIZE_STEP;
            if (stepSize > MAX_STEP_SIZE) {
                stepSize = MAX_STEP_SIZE;
            }
        }
        return Math.min(MAX_TURN_TIME, BASE_TURN_TIME + steps * STEP_TIME);
    }

    registerMove() {
        this.hasMoved = true;
        try {
            this.currentPlayer.isIdle = false;
        } catch (e) {}
    }

    async initMap() {
        await this.map.loadMap();
        await this.figures.loadArmy();
        await this.figures.loadBuildings();
        this.placeStartBuildings();
    }

    placeStartBuildings() {
        this.map.addFigure(this.figures.getFigure(this.settings.labId, 2), {
            who: "RED",
            figureId: this.settings.labId,
            figureType: 2,
            mapPositionX: this.map.mapData.redResearchLab.x,
            mapPositionY: this.map.mapData.redResearchLab.y,
        });
        this.map.addFigure(this.figures.getFigure(this.settings.labId, 2), {
            who: "BLUE",
            figureId: this.settings.labId,
            figureType: 2,
            mapPositionX: this.map.mapData.blueResearchLab.x,
            mapPositionY: this.map.mapData.blueResearchLab.y,
        });
    }

    async addPlayer(playerSocket) {
        let nick = playerSocket.handshake.query.nick;
        return await runWhenUnlock("addPlayer", () => {
            if (this.bluePlayer == null) {
                this.bluePlayer = new Player(this, nick, playerSocket, "BLUE");
                return "BLUE";
            }
            if (this.redPlayer == null) {
                this.redPlayer = new Player(this, nick, playerSocket, "RED");
                return "RED";
            }

            if (this.bluePlayer.nick === nick) {
                this.bluePlayer.socket = playerSocket;
                this.bluePlayer.isConnect = true;
                return "BLUE";
            }
            if (this.redPlayer.nick === nick) {
                this.redPlayer.socket = playerSocket;
                this.redPlayer.isConnect = true;
                return "RED";
            }
            return null;
        });
    }

    canStartGame() {
        return this.bluePlayer != null && this.redPlayer != null;
    }

    win(player) {
        const { removeRoom } = require("../sockets");
        removeRoom(this);
        let win =
            this.redPlayer.socket.id === player.socket.id ? "RED" : "BLUE";

        this.redPlayer.socket.emit("endGame", {
            who: win,
        });
        this.bluePlayer.socket.emit("endGame", {
            who: win,
        });
    }

    async startGame() {
        if (!this.canStartGame()) return false;
        this.isStartGame = true;
        if (this.timer == -1) this.startTurn();
        return true;
    }

    placeFigure(player, figure) {
        //TODO: make checking if this move is OK
        let playerObj =
            this.redPlayer.socket.id === player
                ? this.redPlayer
                : this.bluePlayer;
        figure.who = this.redPlayer.socket.id === player ? "RED" : "BLUE";
        let obj = this.figures.getFigure(figure.figureId, figure.figureType);
        this.figures.supplyOperations(obj, playerObj, figure.figureType);
        this.map.addFigure(obj, figure);
        this.sendToOpponent(player, "placeFigure", figure);
    }

    moveFigure(player, moveData) {
        //TODO: make checking if this move is OK
        this.map.moveFigure(moveData);
        this.sendToOpponent(player, "moveFigure", moveData);
    }

    attackFigure(player, moveData) {
        //TODO: make checking if this move is OK
        this.map.attackFigure(moveData);
        this.sendToOpponent(player, "attackFigure", moveData);
    }

    endTurn(player) {
        if (this.redPlayer.socket.id === player) {
            if (this.bluePlayer.addResearchPoint()) return;
            this.bluePlayer.renewSupplies();
            this.turn = "BLUE";
        } else {
            if (this.redPlayer.addResearchPoint()) return;
            this.redPlayer.renewSupplies();
            this.turn = "RED";
        }
        this.map.figures.forEach((figure) => {
            if (figure.who === this.turn) {
                figure.isMoved = false;
                figure.takeDamage = false;
                figure.isAttack = false;
            }
        });
        this.redPlayer.socket.emit("changeTurn", { msg: this.turn });
        this.bluePlayer.socket.emit("changeTurn", { msg: this.turn });
        this.startTurn();
    }

    startTurn() {
        this.timer = this.currentTurnTimer;
        this.hasMoved = false;
        this.turnTimer(this.turn);
    }

    turnTimer(turn) {
        if (
            this.turn !== turn ||
            (!this.bluePlayer?.isConnect && !this.redPlayer?.isConnect)
        )
            return;
        if (
            !this.isStartGame ||
            !this.bluePlayer?.isConnect ||
            !this.redPlayer?.isConnect
        ) {
            setTimeout(() => {
                this.turnTimer(turn);
            }, 1000);
            return;
        }

        this.redPlayer.socket.emit("turnTimer", {
            time: this.timer,
            turn: this.turn,
        });
        this.bluePlayer.socket.emit("turnTimer", {
            time: this.timer,
            turn: this.turn,
        });

        setTimeout(() => {
            if (this.timer > 0) {
                this.timer--;
                this.turnTimer(turn);
            } else {
                if (!this.hasMoved) {
                    if (this.currentPlayer.isIdle) {
                        this.currentPlayer.isIdle = false;
                        this.currentPlayer.socket.emit("idle", {
                            disconnect: true,
                        });
                        this.endTurn(this.currentPlayer.socket.id);
                        this.currentPlayer.socket.disconnect();
                        return;
                    }
                    this.currentPlayer.isIdle = true;
                    this.currentPlayer.socket.emit("idle", {
                        disconnect: false,
                    });
                }
                this.endTurn(this.currentPlayer.socket.id);
            }
        }, 1000);
    }

    sendToOpponent(player, endpoint, msg) {
        if (!this.isStartGame) return;
        if (this.bluePlayer.socket.id === player) {
            this.redPlayer.socket.emit(endpoint, {
                who: "BLUE",
                msg: msg,
            });
        } else {
            this.bluePlayer.socket.emit(endpoint, {
                who: "RED",
                msg: msg,
            });
        }
    }

    waitForReconnect(player) {
        setTimeout(() => {
            if (!this.bluePlayer.isConnect || !this.redPlayer.isConnect) {
                if (!this.bluePlayer.isConnect && !this.redPlayer.isConnect)
                    return;
                this.winTimer--;
                if (this.winTimer > 0) {
                    player.socket.emit("playerDisconnect", {
                        nick: this.bluePlayer.nick,
                        timer: this.winTimer,
                    });
                    this.waitForReconnect(player);
                } else {
                    this.win(
                        this.bluePlayer.isConnect
                            ? this.bluePlayer
                            : this.redPlayer
                    );
                }
            }
        }, 1000);
    }

    disconnectPlayer(player) {
        if (this.bluePlayer && this.bluePlayer.socket.id === player) {
            this.bluePlayer.isConnect = false;
            this.isStartGame = false;
            if (this.redPlayer) {
                this.winTimer = KICK_TIME;
                this.redPlayer.socket.emit("playerDisconnect", {
                    nick: this.bluePlayer.nick,
                    timer: this.winTimer,
                });
                this.waitForReconnect(this.redPlayer);
            }
        } else if (this.redPlayer && this.redPlayer.socket.id === player) {
            this.redPlayer.isConnect = false;
            this.isStartGame = false;
            if (this.bluePlayer) {
                this.winTimer = KICK_TIME;
                this.bluePlayer.socket.emit("playerDisconnect", {
                    nick: this.redPlayer.nick,
                    timer: this.winTimer,
                });
                this.waitForReconnect(this.bluePlayer);
            }
        }

        return this.bluePlayer?.isConnect || this.redPlayer?.isConnect;
    }
};
