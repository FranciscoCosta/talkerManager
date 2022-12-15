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
    console.log(talkid);
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
talker.push(newtalkerObj);
await writeFile(talker);
console.log(talker);
res.status(201).json(newtalkerObj);
});
module.exports = talkerRouter;