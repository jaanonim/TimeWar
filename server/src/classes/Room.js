module.exports = class Room {
    constructor(name) {
        this.name = name;
        this.bluePlayer = null;
        this.redPlayer = null;
        this.isStartGame = false;
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
        if(!this.isStartGame) return;
        if (this.bluePlayer.id === player) {
            this.redPlayer.emit("placeFigure", {
                who:"BLUE",
                figure
            });
        } else {

            this.bluePlayer.emit("placeFigure", {
                who: "RED",
                figure
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