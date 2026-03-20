const express = require('express')
const router = express.Router()
const Pilote = require('../models/pilote')

// GET - Récupérer tous les pilotes
router.get('/', async (req, res) => {
    try {
        const pilotes = await Pilote.find()
        res.json(pilotes)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// POST - Créer un pilote
router.post('/', async (req, res) => {
    try {
        const pilote = new Pilote(req.body)
        await pilote.save()
        res.status(201).json(pilote)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// DELETE - Supprimer un pilote
router.delete('/:id', async (req, res) => {
    try {
        await Pilote.findByIdAndDelete(req.params.id)
        res.json({ message: 'Pilote supprimé ✅' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

module.exports = router