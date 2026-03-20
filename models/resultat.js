const mongoose = require('mongoose')

const resultatSchema = new mongoose.Schema({
    pilote: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pilote',
        required: true
    },
    circuit: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Circuit',
        required: true
    },
    position_course: {
        type: Number,
        required: true
    },
    position_qualif: {
        type: Number,
        required: true
    },
    points: {
        type: Number,
        required: true,
        default: 0
    },
    meilleur_tour: {
        type: Boolean,
        default: false
    },
    abandon: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

const Resultat = mongoose.model('Resultat', resultatSchema)
module.exports = Resultat