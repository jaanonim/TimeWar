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
    offset:[Number]
});

const Building = mongoose.model("Building", buildingSchema);

module.exports = {Building, buildingSchema};
