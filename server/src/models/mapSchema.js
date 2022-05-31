const mongoose = require("mongoose");
const {Schema} = mongoose;

const mapSchema = new Schema({
    map: [[Number]],
    blueResearchLab:{
        x:Number,
        y:Number
    },
    redResearchLab:{
        x:Number,
        y:Number
    }
});

const Map = mongoose.model("Map", mapSchema);

module.exports = {Map, mapSchema};
