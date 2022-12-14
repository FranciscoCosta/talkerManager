const express = require('express');
const { geraToken } = require('../utils');

const loginRouter = express.Router();

loginRouter.post('/login', (req, res) => {
    const token = { token: geraToken() };
    res.status(200).json(token);
});

module.exports = loginRouter;