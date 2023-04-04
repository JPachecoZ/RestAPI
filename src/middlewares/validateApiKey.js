const validateApiKey = (req, res, next) => {
  const apiKey = req.headers['apikey'];
  if (!apiKey || apiKey !== process.env.API_KEY_QUINNY) {
    return res.status(401).json({ message: 'API key inválida' });
  }
  next();
};

module.exports = validateApiKey;
