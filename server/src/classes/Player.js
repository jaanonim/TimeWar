module.exports = class Player {
    constructor(room, name, socket) {
        this.room = room;
        this.name = name;
        this.socket = socket;
        this.winProgress = 0;
    }

    addResearchPoint() {
        this.winProgress++;
        if (this.winProgress >= this.room.winTarget) {
            this.room.win(this);
        }
    }

};
