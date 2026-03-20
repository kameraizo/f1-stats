const mongoose = require('mongoose')

const circuitSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true,
        unique: true
    },
    pays: {
        type: String,
        required: true
    },
    numero_gp: {
        type: Number,
        required: true,
        unique: true
    }
})

const Circuit = mongoose.model('Circuit', circuitSchema)
module.exports = Circuit