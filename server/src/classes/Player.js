module.exports = class Player {
    constructor(room, nick, socket, color) {
        this.room = room;
        this.nick = nick;
        this.isConnect = true;
        this.isIdle = false;
        this.team = color;
        this.supplies = {
            land_army: {
                supply: this.room.settings.supply.land_army,
                maxSupply: this.room.settings.supply.land_army,
            },
            air_army: {
                supply: this.room.settings.supply.air_army,
                maxSupply: this.room.settings.supply.air_army,
            },
            building: {
                supply: this.room.settings.supply.building,
                maxSupply: this.room.settings.supply.building,
            },
        };
        this.socket = socket;
        this.winProgress = 0;
    }

    getPlayerData() {
        return {
            nick: this.nick,
            supplies: this.supplies,
            winProgress: this.winProgress,
        };
    }

    renewSupplies() {
        for (let supplyName in this.supplies) {
            this.supplies[supplyName].supply =
                this.supplies[supplyName].maxSupply;
        }
    }

    addResearchPoint() {
        let lab = this.room.map.figures.find((figure) => {
            return (
                figure.id === this.room.settings.labId &&
                figure.who === this.team
            );
        });
        if (lab.takeDamage) return;
        this.winProgress++;
        if (this.winProgress >= this.room.winTarget) {
            this.room.win(this);
            return true;
        }
        return false;
    }
};
