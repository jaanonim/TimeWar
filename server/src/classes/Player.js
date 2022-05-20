module.exports = class Player {
    constructor(room, nick, socket) {
        this.room = room;
        this.nick = nick;
        this.isConnect = true;
        this.supplies = {
            "land_army": {
                supply: 10,
                maxSupply: 10
            },
            "air_army": {
                supply: 10,
                maxSupply: 10
            },
            "building": {
                supply: 10,
                maxSupply: 10
            }
        };
        this.socket = socket;
        this.winProgress = 0;
    }

    getPlayerData() {
        return {
            name: this.name,
            supplies: this.supplies,
            winProgress: this.winProgress
        }
    }

    renewSupplies() {
        for (let supplyName in this.supplies) {
            this.supplies[supplyName].supply = this.supplies[supplyName].maxSupply;
        }
    }

    addResearchPoint() {
        this.winProgress++;
        if (this.winProgress >= this.room.winTarget) {
            this.room.win(this);
        }
    }

};
