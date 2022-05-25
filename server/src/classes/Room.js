const Map = require("./Map");
const Figures = require("./Figures");
const Player = require("./Player");

module.exports = class Room {
    constructor(name) {
        this.name = name;
        this.winTarget = 10;
        this.bluePlayer = null;
        this.redPlayer = null;
        this.isStartGame = false;
        this.turn = "RED";
        this.map = new Map();
        this.figures = new Figures();
    }

    async initMap() {
        await this.map.loadMap("map1");
        await this.figures.loadArmy();
        await this.figures.loadBuildings();
        this.placeStartBuildings();
    }

    placeStartBuildings() {
        let width = this.map.mapStruct.length;
        let height = this.map.mapStruct[0].length;
        this.map.addFigure(this.figures.getFigure(1, 2), {
            who: "BLUE",
            figureId: 1,
            figureType: 2,
            mapPositionX: Math.floor(width / 2),
            mapPositionY: 0,
        });
        this.map.addFigure(this.figures.getFigure(1, 2), {
            who: "RED",
            figureId: 1,
            figureType: 2,
            mapPositionX: Math.floor(width / 2),
            mapPositionY: height - 1,
        });
    }

    addPlayer(playerSocket) {
        let nick = playerSocket.handshake.query.nick;
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
    }

    canStartGame() {
        console.log(this.bluePlayer != null, this.redPlayer != null);


        return this.bluePlayer != null && this.redPlayer != null;
    }

    win(player) {
        const {removeRoom} = require("../sockets");
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
        return true;
    }

    placeFigure(player, figure) {
        //TODO: make checking if this move is OK
        let playerObj = this.redPlayer.socket.id === player ? this.redPlayer : this.bluePlayer;
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
            this.bluePlayer.addResearchPoint();
            this.bluePlayer.renewSupplies();
            this.turn = "RED";
        } else {
            this.redPlayer.addResearchPoint();
            this.redPlayer.renewSupplies();
            this.turn = "BLUE";
        }
        this.map.figures.forEach((figure) => {
            figure.isMoved = false;
            figure.takeDamage = false;
            figure.isAttack = false;
        });
        this.sendToOpponent(player, "changeTurn", this.turn);
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

    disconnectPlayer(player) {
        if (this.bluePlayer && this.bluePlayer.socket.id === player) {
            this.bluePlayer.isConnect = false;
            this.isStartGame = false;
        } else if (this.redPlayer && this.redPlayer.socket.id === player) {
            this.redPlayer.isConnect = false;
            this.isStartGame = false;
        }

        return this.bluePlayer?.isConnect || this.redPlayer?.isConnect;
    }
};
