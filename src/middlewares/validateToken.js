const jwt = require('jsonwebtoken')

const validateToken = (req, res, next) => {
    const token = req.header("authorization")
    if(!token) return res.status(401).json({ error: 'Acceso denegado' })
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = verified
        next()
    } catch (error){
        res.status(400).json({ error: 'Token no es valido' })
    }
}

module.exports = validateToken