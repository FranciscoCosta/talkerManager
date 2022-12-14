const express = require('express');
const { validateUser } = require('../middlewares/validateUser');
const { geraToken } = require('../utils');

const loginRouter = express.Router();

loginRouter.post('/login', validateUser, (req, res) => {
    const token = { token: geraToken() };
    res.status(200).json(token);
});

module.exports = loginRouter;