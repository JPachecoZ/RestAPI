const validateApiKey = (req, res, next) => {
  console.log(">>>HEADERS", req.headers)
  console.log(">>>HEADERS", req.headers['Authorization'])
  const apiKey = req.headers['Authorization'];
  if (!apiKey || apiKey !== process.env.API_KEY_QUINNY) {
    return res.status(401).json({ message: 'API key inválida' });
  }
  next();
};

module.exports = validateApiKey;
