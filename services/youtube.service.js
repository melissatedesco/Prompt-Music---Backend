/**
 * services/youtube.service.js
 * servizio per interagire con l'API YouTube Data v3
 */


const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search'

export async function searchVideo(query) {
    const apiKey = process.env.YOUTUBE_API_KEY

    if (!apiKey) {
        throw new Error("YOUTUBE_API_KEY non è configurata nell'ambiente");
    }

    // costruzione sicura dell'URL e dei query params
    const url = new URL(YOUTUBE_SEARCH_URL)
        url.search = new URLSearchParams({
            part: 'snippet',
            q: query,
            type: 'video',
            maxResults: '1',
            key: apiKey
        }).toString()

        const response = await fetch(url)

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}))
            const message = errorData.error?.message ?? `HTTP error ${response.status}`
            throw new Error(`Errore YouTube API: ${message}`)
        }

        const data = await response.json()
        const items = data.items

        if (!items || items.length === 0) {
            return null
        }

        const firstVideo = items[0]

        return{
            videoId: firstVideo.id.videoId,
            title: firstVideo.snippet.title
        }
}