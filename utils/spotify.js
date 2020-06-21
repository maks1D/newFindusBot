const SpotifyAPI = require('node-spotify-api')

const spotify = new SpotifyAPI({
    id: ef.tokens.SpotifyID,
    secret: ef.tokens.SpotifySecret
})

exports.search = async (id) => {
    try {
        const track = await spotify.request(`https://api.spotify.com/v1/tracks/${id}`)
        return track
    } catch (e) {
        return false
    }
}
  