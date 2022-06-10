const Map = require("./Map");
const Figures = require("./Figures");
const Player = require("./Player");
const { runWhenUnlock } = require("../utils/asyncSync");

//TODO: move to some settings
const KICK_TIME = 100; // in seconds
const TURN_TIME = 10; // in seconds

module.exports = class Room {
    constructor(name, settings) {
        this.settings = settings;
        this.name = name;
        this.winTarget = settings.playerTarget;
        this.bluePlayer = null;
        this.redPlayer = null;
        this.isStartGame = false;
        this.turn = "RED";
        this.timer = 0;
        this.hasMoved = false;
        this.map = new Map();
        this.figures = new Figures();
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
                this.bluePlayer = new Player(this, nick, playerSocket);
                return "BLUE";
            }
            if (this.redPlayer == null) {
                this.redPlayer = new Player(this, nick, playerSocket);
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
        this.startTurn();
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
        if (this.bluePlayer.socket.id === player) {
            if (this.bluePlayer.addResearchPoint()) return;
            this.bluePlayer.renewSupplies();
            this.turn = "RED";
        } else {
            if (this.redPlayer.addResearchPoint()) return;
            this.redPlayer.renewSupplies();
            this.turn = "BLUE";
        }
        this.map.figures.forEach((figure) => {
            figure.isMoved = false;
            figure.takeDamage = false;
            figure.isAttack = false;
        });
        console.log("end turn", this.turn);
        this.redPlayer.socket.emit("changeTurn", { msg: this.turn });
        this.bluePlayer.socket.emit("changeTurn", { msg: this.turn });
        this.startTurn();
    }

    startTurn() {
        this.timer = TURN_TIME;
        this.hasMoved = false;
        this.turnTimer(this.turn);
    }

    turnTimer(turn) {
        if (
            this.turn !== turn ||
            !this.bluePlayer?.isConnect ||
            !this.redPlayer?.isConnect
        )
            return;
        if (!this.isStartGame) {
            setTimeout(() => {
                this.turnTimer(turn);
            }, 1000);
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
                const player =
                    turn === "RED" ? this.redPlayer : this.bluePlayer;
                if (!this.hasMoved) {
                    if (player.isIdle) {
                        player.isIdle = false;
                        player.socket.emit("idle", { disconnect: true });
                        this.endTurn(player.socket.id);
                        player.socket.disconnect();
                        return;
                    }
                    player.isIdle = true;
                }
                player.socket.emit("idle", { disconnect: false });
                this.endTurn(player.socket.id);
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
