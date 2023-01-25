const userSchema = require('../models/user')

const createUser = async (req, res) =>{
    const userData = {...req.body}
    try{
        const userExist = await userSchema.findOne({email: userData.email})
        if (userExist) throw new Error('Email already exists')
        
        const newUser = new userSchema(userData)
        newUser.save().then((response) => res.json(response))
    } catch(error) {
        res.json({ error: error.message })
    }
}

const showUser = async (req, res) => {
    const { id } = req.params
    userSchema
      .findById(id)
      .then((data) => res.json(data))
      .catch((error) => {
        res.status(404).json({message: error.message})
    })
}

const updateUser = (req, res) => {
    const { id } = req.params
    const { email, password, name, phone, address } = req.body
    userSchema
      .updateOne({ _id: id }, { $set: {email, password, name, phone, address} })
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error.message }))
}

module.exports = {
    createUser,
    showUser,
    updateUser
}