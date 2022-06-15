const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send(
        JSON.stringify({
            message: "pong",
            time: new Date().toISOString(),
        })
    );
});

module.exports = router;
