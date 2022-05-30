const mongoose = require("mongoose");
const { Army } = require("../models/armySchema");
const { Building } = require("../models/buildingSchema");
const { Map } = require("../models/mapSchema");
const { DefaultSettings } = require("../models/DefalutSettingsSchema");
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
    async getMapList(query = {}) {
        let maps = await Map.find(query);

        return maps.map((a) => {
            return { id: a._id.toString(), ...a._doc };
        });
    }

    async getDefaultSetting() {
        let setting = await DefaultSettings.find();
        console.log(setting);
        if (setting.length === 0) {
            const defaultSettings = new DefaultSettings({
                playerTarget: 10,
                labId: "",
                supply: {
                    air_army: 5,
                    land_army: 5,
                    building: 5,
                },
            });
            defaultSettings.save();
            return defaultSettings;
        }
        return setting[0];
    }
}

let databaseController = new DatabaseController();
module.exports = databaseController;
