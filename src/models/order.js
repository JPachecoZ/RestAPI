const mongoose = require('mongoose')
const { Schema } = mongoose

const orderSchema = new Schema({
    delivery_address: {
        type: String,
        required: true
    },
    user_id: {
        type: Number,
        required: true
    },
    items: [
        {
            product_id: {
                type: Number,
            },
            order_id: {
                type: Number
            },
            quantity: {
                type: Number
            }
        }
    ]
}
)

module.exports = mongoose.model('Order', orderSchema)