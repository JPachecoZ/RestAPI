const User = require('../models/user')
const jwt = require('jsonwebtoken')

let user
const login = async (req, res) =>{
    try{
        user = await User.findOne({ email: req.body.email })
        if(!user) throw new Error("Email not found")
        
        if(!await user.comparePassword(req.body.password)) throw new Error("Wrong password")

        const token = jwt.sign({
            email: user.email,
            id: user._id,
        }, process.env.TOKEN_SECRET, { expiresIn: '1d' })

        res.json({email: user.email, id: user._id, token})
    } catch (error){
        res.json(error.message)
    }
}

const logout = async (req, res) => {
    res.json('Logged out')
}

module.exports = {
    login,
    logout
}