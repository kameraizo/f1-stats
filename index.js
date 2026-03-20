const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express()

// Middlewares
app.use(cors())
app.use(express.json())

// Connexion MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connecté ✅'))
    .catch(err => console.error('Erreur MongoDB ❌', err))

// Routes
const pilotesRouter = require('./routes/pilotes')
const circuitsRouter = require('./routes/circuits')
const resultatsRouter = require('./routes/resultats')
const statsRouter = require('./routes/stats')

app.use('/pilotes', pilotesRouter)
app.use('/circuits', circuitsRouter)
app.use('/resultats', resultatsRouter)
app.use('/stats', statsRouter)

// Route de test
app.get('/', (req, res) => {
    res.json({ message: 'API F1 Stats 🏎️' })
})

// Lancement du serveur
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Serveur lancé sur le port ${PORT} 🚀`)
})