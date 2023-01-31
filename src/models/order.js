const mongoose = require('mongoose')
const { Schema } = mongoose

const orderSchema = new Schema({
    delivery_address: {
        type: String,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    created_date: {
        type: Date,
        default: Date.now,
    },
    user_id: {
        type: String,
        required: true
    },
    items: [
        {
            product_id: {
                type: String,
            },
            order_id: {
                type: String
            },
            quantity: {
                type: Number
            },
            price: {
                type: Number
            }
        }
    ]
}
)

module.exports = mongoose.model('Order', orderSchema)