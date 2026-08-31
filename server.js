/**
 * Entry point del sever Express
 */

import express from 'express'
import cors from 'cors'
import promptRouter from './routes/prompt.js'

// fallback per caricare .env se non è passato al flag --env-file nell'esecuzione
if (!process.env.YOUTUBE_API_KEY) {
    try {
        process.loadEnvFile()
    } catch {
        // il file .env potrebbe non essere presente in alcuni ambienti
    }
}

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// rotte
app.use('/prompt', promptRouter)

// avvio 
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server backend attivo su http://localhost:${PORT}`)
})