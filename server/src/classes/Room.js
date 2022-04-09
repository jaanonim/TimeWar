module.exports = class Room {
    constructor(name) {
        this.name = name;
        this.bluePlayer = null;
        this.redPlayer = null;
        this.isStartGame = false;
        this.turn = "RED";
    }

    addPlayer(playerSocket) {
        if (this.bluePlayer == null) {
            this.bluePlayer = playerSocket;
            return "BLUE";
        }
        if (this.redPlayer == null) {
            this.redPlayer = playerSocket;
            return "RED";
        }
        return null;
    }

    canStartGame() {
        return this.bluePlayer != null && this.redPlayer != null;
    }

    startGame() {
        if (!this.canStartGame()) return false;
        this.isStartGame = true;
        return true;
    }

    placeFigure(player, figure) {
        //TODO: make checking if this move is OK
        this.sendToOpponent(player, "placeFigure", figure);
    }

    moveFigure(player, moveData) {
        //TODO: make checking if this move is OK
        this.sendToOpponent(player, "moveFigure", moveData);
    }


    endTurn(player) {
        if (this.bluePlayer.id === player) {
            this.turn = "RED";
        } else {
            this.turn = "BLUE";
        }
        this.sendToOpponent(player, "youTurn");
    }

    sendToOpponent(player, endpoint, msg) {
        if (!this.isStartGame) return;
        if (this.bluePlayer.id === player) {
            this.redPlayer.emit(endpoint, {
                who: "BLUE",
                msg: msg
            });
        } else {
            this.bluePlayer.emit(endpoint, {
                who: "RED",
                msg: msg
            });
        }
    }

    disconnectPlayer(player) {
        if (this.bluePlayer && this.bluePlayer.id === player) {
            this.bluePlayer = null;
            this.isStartGame = false;
            return true;
        }
        if (this.redPlayer && this.redPlayer.id === player) {
            this.redPlayer = null;
            this.isStartGame = false;
            return true;
        }
        return false;
    }

};
