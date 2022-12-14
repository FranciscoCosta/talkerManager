const fs = require('fs').promises;

const PATH = './src/talker.json';
const readFile = async () => {
    const response = await fs.readFile(PATH, 'utf-8');
    const data = await JSON.parse(response);
    return data;
};

module.exports = {
    readFile,
};