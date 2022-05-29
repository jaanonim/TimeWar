const mongoose = require("mongoose");
const {Schema} = mongoose;

const defaultSettingsSchema = new Schema({
    playerTarget: Number,
    labId: String,
    supply: {
        air_army: Number,
        land_army:Number,
        building: Number
    }
});

const DefaultSettings = mongoose.model("DefaultSetting", defaultSettingsSchema);

module.exports = {DefaultSettings, defaultSettingsSchema};
