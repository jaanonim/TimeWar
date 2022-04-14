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
        await this.figures.loadArmy("Army");
        await this.figures.loadBuildings("Buildings");
        this.placeStartBuildings();
    }

    placeStartBuildings() {
        let width = this.map.mapStruct.length;
        let height = this.map.mapStruct[0].length;
        this.map.addFigure({
            who: "BLUE",
            figureId: 1,
            figureType: 2,
            mapPositionX: Math.floor(width / 2),
            mapPositionY: 0,
        });
        this.map.addFigure({
            who: "RED",
            figureId: 1,
            figureType: 2,
            mapPositionX: Math.floor(width / 2),
            mapPositionY: height - 1,
        });
    }

    addPlayer(playerSocket) {
        if (this.bluePlayer == null) {
            this.bluePlayer = new Player(this, "", playerSocket);
            return "BLUE";
        }
        if (this.redPlayer == null) {
            this.redPlayer = new Player(this, "", playerSocket);
            return "RED";
        }
        return null;
    }

    canStartGame() {
        return this.bluePlayer != null && this.redPlayer != null;
    }

    win(player) {
        let win = this.redPlayer.socket.id === player.socket.id ? "RED" : "BLUE";

        this.redPlayer.socket.emit("endGame", {
            who:win
        });
        this.bluePlayer.socket.emit("endGame", {
            who:win
        });

    }

    async startGame() {
        if (!this.canStartGame()) return false;
        this.isStartGame = true;
        return true;
    }

    placeFigure(player, figure) {
        //TODO: make checking if this move is OK
        figure.who = this.redPlayer.socket.id === player ? "RED" : "BLUE";
        this.map.addFigure(figure);
        this.sendToOpponent(player, "placeFigure", figure);
    }

    moveFigure(player, moveData) {
        //TODO: make checking if this move is OK
        this.map.moveFigure(moveData);
        this.sendToOpponent(player, "moveFigure", moveData);
    }


    endTurn(player) {
        if (this.bluePlayer.socket.id === player) {
            this.bluePlayer.addResearchPoint();
            this.turn = "RED";
        } else {
            this.redPlayer.addResearchPoint();
            this.turn = "BLUE";
        }
        this.map.figures.forEach(figure => figure.isMoved = false);
        this.sendToOpponent(player, "changeTurn", this.turn);
    }

    sendToOpponent(player, endpoint, msg) {
        if (!this.isStartGame) return;
        if (this.bluePlayer.socket.id === player) {
            this.redPlayer.socket.emit(endpoint, {
                who: "BLUE",
                msg: msg
            });
        } else {
            this.bluePlayer.socket.emit(endpoint, {
                who: "RED",
                msg: msg
            });
        }
    }

    disconnectPlayer(player) {
        if (this.bluePlayer && this.bluePlayer.socket.id === player) {
            this.bluePlayer = null;
            this.isStartGame = false;
            return true;
        }
        if (this.redPlayer && this.redPlayer.socket.id === player) {
            this.redPlayer = null;
            this.isStartGame = false;
            return true;
        }
        return false;
    }

};
