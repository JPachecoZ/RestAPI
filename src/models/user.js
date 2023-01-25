const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    phone: {
        type: Number,
    },
    address: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String,
    },
}
)

userSchema.pre('save', function(next){
    const user = this
    if (!user.isModified('password')) return next()

    bcrypt.genSalt(10, function(err, salt){
        if (err) return next(err)

        bcrypt.hash(user.password, salt, function(err, hash){
            if (err) return next(err)
            user.password = hash
            next()
        })
    })
})

userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', new mongoose.Schema(userSchema))

module.exports = User