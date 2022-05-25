require("dotenv").config();
const express = require("express");
const router = express.Router();
const session = require('express-session');
const {authInfo, authenticate, restrict} = require("../utils/auth");
const {Army} = require("../models/armySchema");
router.use(express.urlencoded({extended: false}));
router.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.secret
}));

router.use(authInfo);
// router.use("/panel", restrict); //TODO: Uncomment
router.use("/panel", express.static("staticRestricted"));
router.post("/login", (req, res) => {
    authenticate(req.body.login, req.body.password, (err, isLogin, next) => {
        if (err) return next(err);
        if (isLogin) {
            req.session.regenerate(function () {
                req.session.user = "ADMIN";
                res.redirect("/admin/panel");
            });
        } else {
            res.redirect('/admin/');
        }
    });
});


router.post("/addArmy", (req, res) => {
    console.log(req.body);

    let attackMask = [];
    for (let i = 0; i < req.body.AttackMaskWidth; i++) {
        attackMask[i] = [];
        for (let j = 0; j < req.body.AttackMaskHeight; j++) {
            attackMask[i][j] = req.body[`AttackMask${i}x${j}`] === "on" ? 1 : 0;
        }
    }
    let moveMask = [];
    for (let i = 0; i < req.body.MoveMaskWidth; i++) {
        moveMask[i] = [];
        for (let j = 0; j < req.body.MoveMaskHeight; j++) {
            moveMask[i][j] = req.body[`MoveMask${i}x${j}`] === "on" ? 1 : 0;
        }
    }

    const army = new Army({
        name: req.body.name,
        image: req.body.image,
        description: req.body.description,
        lives: req.body.lives,
        maxLives: req.body.maxLives,
        damage: req.body.damage,
        isFlyable: req.body.isFlyable === "0",
        model: req.body.model,
        scale: req.body.scale,
        price: req.body.price,
        attackMask: attackMask,
        moveMask: moveMask
    });
    army.save();


    res.send("CREATE");
});

module.exports = router;
