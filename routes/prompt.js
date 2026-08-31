/**
 * routes/prompt.js
 *  Rotta Post per gestire la converazione del prompt e la ricerca del video
 */

import { Router } from "express";
import { parsePrompt } from "../utils/promptParser";
import { searchVideo } from "../services/youtube.service";

const router = Router()

router.post('/', async (req, resizeBy, next) => {
    
})