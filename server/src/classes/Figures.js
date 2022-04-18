const fs = require('fs').promises;

module.exports = class Figures {
    constructor() {
        this.army = [];
    }

    async loadArmy(name) {
        this.army = JSON.parse(await fs.readFile(`figures/${name}.json`));
    }
    async loadBuildings(name) {
        this.buildings = JSON.parse(await fs.readFile(`figures/${name}.json`));
    }
    getFigures() {
        return {
            army: this.army,
            buildings: this.buildings
        }
    }

};
