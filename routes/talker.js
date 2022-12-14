const express = require('express');
const { readFile } = require('../utils');

const talkerRouter = express.Router();

// talkerRouter.get('/', (_req, res) => res.status(200).json('AQui'));

talkerRouter.get('/talker', async (_req, res) => {
    const talkers = await readFile();
    return res.status(200).json(talkers);
});

talkerRouter.get('/talker/:id', async (req, res) => {
    const { id } = req.params;
    const talk = await readFile();
    const talkid = talk.find((talker) => talker.id === Number(id));
    console.log(talkid);
    if (!talkid) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' }); 
}
    return res.status(200).json(talkid);
});
module.exports = talkerRouter;