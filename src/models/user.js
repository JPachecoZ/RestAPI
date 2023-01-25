const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
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
        unique: true,
        default: null
    },
}
)

module.exports = mongoose.model('User', userSchema)