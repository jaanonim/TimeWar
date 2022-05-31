const mongoose = require("mongoose");
const {Schema} = mongoose;

const buildingSchema = new Schema({
    name: String,
    image: String,
    description: String,
    lives: Number,
    maxLives: Number,
    model: String,
    scale: Number,
    price: Number,
    display: Boolean,
    capturingMask: [[Number]],
    offset:{
        x:Number,
        y:Number,
        z:Number
    },
    increaseSupplyType: String,
    increaseSupply: Number
});

const Building = mongoose.model("Building", buildingSchema);

module.exports = {Building, buildingSchema};
