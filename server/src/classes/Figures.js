const fs = require('fs').promises;
const databaseController = require("./DatabaseController");

module.exports = class Figures {
    constructor() {
        this.army = [];
    }

    async loadArmy() {
        this.army = await databaseController.getArmyList();
    }

    async loadBuildings() {
        this.buildings = JSON.parse(await fs.readFile(`figures/Buildings.json`));
    }

    getFigure(id, figureType) {
        if (figureType === 1) {
            console.log(this.army,id);
            return this.army.find(arm => arm.id === id);
        } else if (figureType === 2) {
            return this.buildings.find(arm => arm.id === id);
        }
    }

    getFigures() {
        return {
            army: this.army,
            buildings: this.buildings
        }
    }

    supplyOperations(obj, playerObj, type) {
        if (type === 1) {
            if (obj.isFlyable) {
                playerObj.supplies['air_army'].supply -= obj.price;
            } else {
                playerObj.supplies['land_army'].supply -= obj.price;
            }
        } else if (type === 2) {
            playerObj.supplies['building'].supply -= obj.price;
        }

        if (obj.increaseSupplyType != null) {
            let supply = playerObj.supplies[obj.increaseSupplyType.toLowerCase()];
            supply.maxSupply += obj.increaseSupply;
        }
    }

};
