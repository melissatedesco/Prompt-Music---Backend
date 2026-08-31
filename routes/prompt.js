/**
 * routes/prompt.js
 *  Rotta Post per gestire la converazione del prompt e la ricerca del video
 */

import { Router } from "express";
import { parsePrompt } from "../utils/promptParser.js";
import { searchVideo } from "../services/youtube.service.js";

const router = Router()

router.post('/', async (req, res, next) => {
    try {
        const { prompt } = req.body

        if(!prompt || typeof prompt !== 'string' || prompt.trim() === '') {
            return res.status(400).json({
                error: 'Il parametro "prompt" è obbligatorio e dev\'essere una stringa valida'
            })
        }

        const query = parsePrompt(prompt)
        const videoResult = await searchVideo(query)

        if(!videoResult) {
            return res.status(404).json({
                error: 'Nessun video trovato per il prompt fornito',
                query
            })
        }

        return res.json({
            query,
            videoId: videoResult.videoId,
            title: videoResult.title
        })

    } catch (error) {
        console.log('[ERRORE /prompt]:', error.message)
        return res.status(500).json({
            error: 'Si è verificato un errore interno al server',
            details: error.message
        })
    }
})

export default router
