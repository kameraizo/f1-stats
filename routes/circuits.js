const express = require('express')
const router = express.Router()
const Circuit = require('../models/circuit')

// GET - Récupérer tous les circuits
router.get('/', async (req, res) => {
    try {
        const circuits = await Circuit.find().sort({ numero_gp: 1 })
        res.json(circuits)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// POST - Créer un circuit
router.post('/', async (req, res) => {
    try {
        const circuit = new Circuit(req.body)
        await circuit.save()
        res.status(201).json(circuit)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// DELETE - Supprimer un circuit
router.delete('/:id', async (req, res) => {
    try {
        await Circuit.findByIdAndDelete(req.params.id)
        res.json({ message: 'Circuit supprimé ✅' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

module.exports = router