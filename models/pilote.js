const mongoose = require('mongoose')

const piloteSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true,
        unique: true
    },
    ecurie: {
        type: String,
        required: true
    },
    numero: {
        type: Number,
        required: true
    }
})

const Pilote = mongoose.model('Pilote', piloteSchema)
module.exports = Pilote