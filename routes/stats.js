const express = require('express')
const router = express.Router()
const Resultat = require('../models/resultat')

// GET - Classement championnat
router.get('/classement', async (req, res) => {
    try {
        const classement = await Resultat.aggregate([
            {
                $group: {
                    _id: '$pilote',
                    total_points: { $sum: '$points' },
                    victoires: { $sum: { $cond: [{ $eq: ['$position_course', 1] }, 1, 0] } },
                    podiums: { $sum: { $cond: [{ $lte: ['$position_course', 3] }, 1, 0] } },
                    poles: { $sum: { $cond: [{ $eq: ['$position_qualif', 1] }, 1, 0] } },
                    meilleurs_tours: { $sum: { $cond: ['$meilleur_tour', 1, 0] } },
                    abandons: { $sum: { $cond: ['$abandon', 1, 0] } },
                    courses: { $sum: 1 }
                }
            },
            { $sort: { total_points: -1 } }
        ])

        const Pilote = require('../models/pilote')
        const classementAvecPilotes = await Promise.all(
            classement.map(async (item) => {
                const pilote = await Pilote.findById(item._id)
                return { ...item, pilote }
            })
        )

        res.json(classementAvecPilotes)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// GET - Duel direct GP par GP
router.get('/duel', async (req, res) => {
    try {
        const resultats = await Resultat.find()
            .populate('pilote')
            .populate('circuit')
            .sort({ 'circuit.numero_gp': 1 })

        const parCircuit = {}
        resultats.forEach(r => {
            const circuitId = r.circuit._id.toString()
            if (!parCircuit[circuitId]) {
                parCircuit[circuitId] = {
                    circuit: r.circuit,
                    pilotes: []
                }
            }
            parCircuit[circuitId].pilotes.push({
                pilote: r.pilote.nom,
                position_course: r.position_course,
                position_qualif: r.position_qualif,
                points: r.points,
                meilleur_tour: r.meilleur_tour,
                abandon: r.abandon
            })
        })

        res.json(Object.values(parCircuit))
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

module.exports = router