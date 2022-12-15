const validateToken = (req, res, next) => {
  const { authorization: token } = req.headers;
  if (!token) {
    return res.status(401).json({
        message: 'Token não encontrado',
    });
  }
  if (token.length !== 16) {
    return res.status(401).json({
        message: 'Token inválido',
    });
  }
  next();
};

const validateName = (req, res, next) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({
            message: 'O campo "name" é obrigatório',
        }); 
    }
    if (name.length < 3) {
        return res.status(400).json({
            message: 'O "name" deve ter pelo menos 3 caracteres',
        }); 
    }
    next();
};

const validateAge = (req, res, next) => {
    const { age } = req.body;
    if (!age) {
        return res.status(400).json({
            message: 'O campo "age" é obrigatório',
        }); 
    }
    if (Number(age) < 18) {
        return res.status(400).json({
            message: 'A pessoa palestrante deve ser maior de idade',
        });
    }
     next();
};

const validateTalk = (req, res, next) => {
    const { talk } = req.body;
    const validateDate = /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;
    if (!talk) {
        return res.status(400).json({
            message: 'O campo "talk" é obrigatório',
        });
    }
    const { watchedAt } = talk;
    if (!watchedAt) {
        return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
    }
    if (!validateDate.test(watchedAt)) {
        return res.status(400).json({
            message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
        });
    }
    next();
};

const validateRate = (req, res, next) => {
    const { talk } = req.body;
    const { rate } = talk;
    if (!rate) {
        return res.status(400).json({
            message: 'O campo "rate" é obrigatório',
        });
    }
    if (Number(rate) > 5 || Number(rate) < 1 || !(Number.isInteger(rate))) {
        return res.status(400).json({
            message: 'O campo "rate" deve ser um inteiro de 1 à 5',
        }); 
}
next();
};

module.exports = {
    validateToken,
    validateName,
    validateAge,
    validateTalk,
    validateRate,
};