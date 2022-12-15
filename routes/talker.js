const express = require('express');
const { validateToken,
    validateName,
    validateAge,
    validateTalk,
    validateRate } = require('../middlewares/validateNewUser');
const { readFile, writeFile } = require('../utils');

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
    if (!talkid) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' }); 
}
    return res.status(200).json(talkid);
});
talkerRouter.post('/talker',
validateToken,
validateName,
validateAge,
validateTalk,
validateRate, async (req, res) => {
  const { name, age, talk } = req.body;
  const talker = await readFile();
  const newid = talker.length + 1;
  const newtalkerObj = {
    id: newid,
    name,
    age,
    talk,
};

const newtalkers = [newtalkerObj, ...talker];
await writeFile(newtalkers);
res.status(201).json(newtalkerObj);
});

talkerRouter.put('/talker/:id',
validateToken,
validateName,
validateAge,
validateTalk,
validateRate, async (req, res) => {
    const { id } = req.params;
    const { name, age, talk } = req.body;
    const talkers = await readFile();
    const talkid = talkers.findIndex((talker) => talker.id === Number(id));
    talkers[talkid] = { ...talkers[talkid], name, age, talk };
    console.log(talkers[talkid]);
    await writeFile(talkers);

    res.status(200).json(talkers[talkid]);
});

talkerRouter.delete('/talker/:id',
validateToken,
 async (req, res) => {
    const { id } = req.params;
    const talkers = await readFile();
    const talkid = talkers.findIndex((talker) => talker.id === Number(id));
    talkers.splice(talkid, 1);
    await writeFile(talkers);
    res.status(204).end();
});

module.exports = talkerRouter;