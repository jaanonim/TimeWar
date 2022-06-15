const express = require("express");
const router = express.Router();
const adminPanelRouter = require("./adminPanelRouter");
const pingRouter = require("./pingRouter");
router.use("/admin", adminPanelRouter);
router.use("/ping", pingRouter);
module.exports = router;
