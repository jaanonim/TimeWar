const express = require("express");
const router = express.Router();
const adminPanelRouter = require("./adminPanelRouter");
router.use("/admin", adminPanelRouter);
module.exports = router;
