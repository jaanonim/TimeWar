require("dotenv").config();
const express = require("express");
const router = express.Router();
const { authInfo, authenticate, restrict } = require("../utils/auth");
const { Army } = require("../models/armySchema");
const { Building } = require("../models/buildingSchema");
const { Map } = require("../models/mapSchema");
const databaseController = require("../classes/DatabaseController");

router.use(express.json());
router.use(authInfo);
router.post("/login", (req, res) => {
    authenticate(req.body.login, req.body.password, (err, token, next) => {
        if (err) return next(err);
        if (token !== "") {
            res.send(token);
        } else {
            res.status(403);
            res.send("LOGIN OR PASSWORD IS INCORRECT");
        }
    });
});

router.post("/addArmy", restrict, (req, res) => {
    const army = new Army({
        name: req.body.name,
        image: req.body.image,
        description: req.body.description,
        lives: req.body.maxLives,
        maxLives: req.body.maxLives,
        damage: req.body.damage,
        isFlyable: req.body.isFlyable === "0",
        model: req.body.model,
        scale: req.body.scale,
        price: req.body.price,
        attackMask: req.body.attackMask,
        moveMask: req.body.moveMask,
    });
    army.save();

    res.send("CREATE id=" + army._id);
});

router.post("/addBuilding", restrict, (req, res) => {
    const building = new Building({
        name: req.body.name,
        image: req.body.image,
        description: req.body.description,
        lives: req.body.maxLives,
        maxLives: req.body.maxLives,
        model: req.body.model,
        scale: req.body.scale,
        price: req.body.price,
        increaseSupplyType: req.body.increaseSupplyType,
        increaseSupply: req.body.increaseSupply,
        display: req.body.display,
        capturingMask: req.body.capturingMask,
        offset: {
            x: req.body.offset[0],
            y: req.body.offset[1],
            z: req.body.offset[2],
        },
    });
    building.save();

    res.send("CREATE id=" + building._id);
});

router.post("/addMap", restrict, (req, res) => {
    const map = new Map({
        map: req.body.map.board,
        blueResearchLab: req.body.blueResearchLab,
        redResearchLab: req.body.redResearchLab,
    });
    map.save();

    res.send("CREATE id=" + map._id);
});

router.post("/changeDefaultSetting", restrict, async (req, res) => {
    let setting = await databaseController.getDefaultSetting();

    Object.assign(setting, req.body);
    setting.save();

    res.send("CREATE");
});

router.get("/getDefaultSetting", restrict, async (req, res) => {
    let setting = await databaseController.getDefaultSetting();

    res.send(JSON.stringify(setting));
});
router.get("/getBuildings", restrict, async (req, res) => {
    let buildings = await databaseController.getBuildingList();

    res.send(JSON.stringify(buildings));
});
module.exports = router;
