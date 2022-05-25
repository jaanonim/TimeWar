const mongoose = require("mongoose");
const {Schema} = mongoose;

const armySchema = new Schema({
    name: String,
    image: String,
    description: String,
    lives: Number,
    maxLives: Number,
    damage: Number,
    isFlyable: Boolean,
    model: String,
    scale: Number,
    price: Number,
    attackMask: [[Number]],
    moveMask: [[Number]]
});

const Army = mongoose.model("Army", armySchema);

module.exports = {Army, armySchema};
