require("dotenv").config();
const express = require("express");
const router = express.Router();
const session = require('express-session');
const {authInfo, authenticate, restrict} = require("../utils/auth");
const {Army} = require("../models/armySchema");
router.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.secret
}));
router.use(express.json());
router.use(authInfo);
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
        moveMask: req.body.moveMask
    });
    army.save();


    res.send("CREATE");
});

module.exports = router;
