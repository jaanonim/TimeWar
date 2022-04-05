const express = require('express');

const indexRouter = require('./routes');

const app = express();

app.use(express.json());
app.use(express.static('../client/dist'));

app.use('/api', indexRouter);

module.exports = app;
