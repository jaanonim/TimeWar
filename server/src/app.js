const express = require('express');
const path = require('path');

const indexRouter = require('./routes');

const app = express();

app.use(express.json());
app.use(express.static('../client/dist'));

app.use('/api', indexRouter);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
});

module.exports = app;
