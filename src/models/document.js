const mongoose = require('mongoose')
const { Schema } = mongoose

const documentSchema = new Schema({
    bubble_id: {
        type: String,
        unique: true,
        required: true,
    },
    file_name: {
        type: String,
        required: true,
    },
    state: {
        type: String,
    },
    iofe_id: {
        type: String,
        unique: true,
    },
}
)

const Document = mongoose.model('Document', documentSchema)
module.exports = Document