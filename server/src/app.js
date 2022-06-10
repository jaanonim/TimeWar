const express = require("express");
const cors = require("cors");
const path = require("path");

const indexRouter = require("./routes");

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.static("../client/dist"));

app.use("/api/", indexRouter);

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../../client/dist/index.html"));
});

module.exports = app;
