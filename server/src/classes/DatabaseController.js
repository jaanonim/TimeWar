const mongoose = require("mongoose");
const { Army } = require("../models/armySchema");
const { Building } = require("../models/buildingSchema");
require("dotenv").config();

class DatabaseController {
    constructor() {
        new Promise(async (resolve) => {
            await mongoose.connect(process.env.mongodbURI);
            resolve();
        });
    }

    async getArmyList(query = {}) {
        let army = await Army.find(query);

        return army.map((a) => {
            return { id: a._id.toString(), ...a._doc };
        });
    }

    async getBuildingList(query = {}) {
        let building = await Building.find(query);

        return building.map((a) => {
            return { id: a._id.toString(), ...a._doc };
        });
    }
}

let databaseController = new DatabaseController();
module.exports = databaseController;
