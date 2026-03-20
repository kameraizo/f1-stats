const express = require('express')
const router = express.Router()
const Resultat = require('../models/resultat')

// Calcul automatique des points selon la position
const calculerPoints = (position, abandon) => {
    if (abandon) return 0
    const bareme = {
        1: 25, 2: 18, 3: 15, 4: 12, 5: 10,
        6: 8,  7: 6,  8: 4,  9: 2,  10: 1
    }
    return bareme[position] || 0
}

// GET - Récupérer tous les résultats
router.get('/', async (req, res) => {
    try {
        const resultats = await Resultat.find()
            .populate('pilote')
            .populate('circuit')
            .sort({ 'circuit.numero_gp': 1 })
        res.json(resultats)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// GET - Résultats d'un pilote
router.get('/pilote/:id', async (req, res) => {
    try {
        const resultats = await Resultat.find({ pilote: req.params.id })
            .populate('pilote')
            .populate('circuit')
        res.json(resultats)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// POST - Ajouter un résultat
router.post('/', async (req, res) => {
    try {
        req.body.points = calculerPoints(req.body.position_course, req.body.abandon)
        const resultat = new Resultat(req.body)
        await resultat.save()
        res.status(201).json(resultat)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// PUT - Modifier un résultat
router.put('/:id', async (req, res) => {
    try {
        req.body.points = calculerPoints(req.body.position_course, req.body.abandon)
        const resultat = await Resultat.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )
        res.json(resultat)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// DELETE - Supprimer un résultat
router.delete('/:id', async (req, res) => {
    try {
        await Resultat.findByIdAndDelete(req.params.id)
        res.json({ message: 'Résultat supprimé ✅' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

module.exports = router