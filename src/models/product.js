const mongoose = require('mongoose')
const { Schema } = mongoose

const productSchema = new Schema({
    name: {
        type: String,
        unique: true,
    },
    price: {
        type: Number,
    },
    category: {
        type: String,
    },
    description: {
        type: String,
    },
    picture_url: {
        type: String,
    }
}
)

const Product = mongoose.model('Product', productSchema)
module.exports = Product