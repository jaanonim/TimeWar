const mongoose = require("mongoose");
const {Army} = require("../models/armySchema");
require('dotenv').config();

class DatabaseController {
    constructor() {

        new Promise(async (resolve) => {
            await mongoose.connect(process.env.mongodbURI);
            resolve();
        })
    }

    async getArmyList(query = {}) {
        let army = await Army.find(query);
        console.log(army);

        return army.map(a => {
            return {id: a._id.toString(), ...a._doc};
        });
    }

}

let databaseController = new DatabaseController();
module.exports = databaseController;
