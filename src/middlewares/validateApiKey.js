const validateApiKey = (req, res, next) => {
  console.log(">>>TOKEN AUTHORIZATION", req.headers.authorization)
  const apiKey = req.headers.authorization;
  if (!apiKey || apiKey !== process.env.API_KEY_QUINNY) {
    return res.status(401).json({ message: 'API key inválida' });
  }
  next();
};

module.exports = validateApiKey;
