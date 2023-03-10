const fs = require('fs').promises;
const crypto = require('crypto');

const PATH = './src/talker.json';
const readFile = async () => {
    const response = await fs.readFile(PATH, 'utf-8');
    const data = await JSON.parse(response);
    return data;
};

const writeFile = async (content) => {
     await fs.writeFile(PATH, JSON.stringify(content));
};

const geraToken = () => crypto.randomBytes(8).toString('hex');

module.exports = {
    readFile,
    geraToken,
    writeFile,
};