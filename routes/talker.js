const express = require('express');
const { readFile } = require('../utils');

const talkerRouter = express.Router();

// talkerRouter.get('/', (_req, res) => res.status(200).json('AQui'));

talkerRouter.get('/talker', async (_req, res) => {
    const talkers = await readFile();
    return res.status(200).json(talkers);
});

module.exports = talkerRouter;