const User = require('../models/user')
const jwt = require('jsonwebtoken')

const login = async (req, res) =>{
    try{
        const user = await User.findOne({ email: req.body.email })
        if(!user) throw new Error("Email not found")
        
        if(!await user.comparePassword(req.body.password)) throw new Error("Wrong password")

        const token = jwt.sign({
            email: user.email,
            id: user._id,
        }, process.env.TOKEN_SECRET)

        res.json({email: user.email, id: user._id, token})
    } catch (error){
        res.json(error.message)
    }
}

const logout = async (req, res) => {

}

module.exports = {
    login,
    logout
}