/**
 * utils/promptParser.js
 * Parser logico (senza LLM) per convertire il prompt in linguaggio naturale
 * in una query di ricerca ottimizzata per la YouTube Data API.
 */

// mappa di associazione tra parole chiave in italiano e termini di ricerca in inglese
const KEYWORD_MAP = {
    // attività e contesti
    'studiare': 'lofi study beats concentration',
    'studio': 'lofi study beats concentration',
    'concentrazione': 'deep focus work music',
    'allenamento': 'workout gym motivation music',
    'palestra': 'workout gym motivation music',
    'corsa': 'running motivation music bpm',
    'dormire': 'deep sleep relaxation music',
    'relax': 'relaxing chill instrumental music',
    'rilassante': 'relaxing chill instrumental music',
    'festa': 'party dance hits music',
    'lavoro': 'background music focus work',
    'meditazione': 'meditation peaceful ambient music',

    // mood e generi
    'jazz': 'smooth jazz background music',
    'rock': 'classic rock hits',
    'pop': 'top pop hits playlist',
    'lofi': 'lofi hip hop beats',
    'allegro': 'upbeat happy feel good music',
    'triste': 'sad emotional acoustic music',
    'classica': 'classical music study focus'
}

/**
 * riceve il prompt dell'utente e restituisce una stringa per la ricerca su YouTube
 * @param {string} promptText - testo inserito dall'utente 
 * @returns {string} - query di ricerca pronta per YouTube
 */
 export function parsePrompt(promptText) {
    if (!promptText || typeof promptText !== 'string') {
        return 'relaxing background music'
    }

    // normalizziamo il testo rimuovendo spazi inutili e convertendo in minuscolo
    const cleanPrompt = promptText.toLowerCase().trim()

    const matchedQueries = []

    // cerca le parole chiave all'interno del prompt
    for (const [keyword, searchTerms] of Object.entries(KEYWORD_MAP)) {
        if (cleanPrompt.includes(keyword)) {
            matchedQueries.push(searchTerms)
        }
    }

    // se si trovano corrispondenze, si uniscono i termini evitando duplicati
    if (matchedQueries.length > 0) {
        return [... new Set(matchedQueries)].join(' ') 
    }

    // se fallisce, usiamo il prompt originale + "music"
    return `${cleanPrompt} music`
}

