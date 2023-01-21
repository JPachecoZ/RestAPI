const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}
)

userSchema.path('email').validate(async (email) =>{
    const emailCount = await mongoose.models.User.countDocuments({email})
    return !emailCount
}, 'Email already exists')

module.exports = mongoose.model('User', userSchema)