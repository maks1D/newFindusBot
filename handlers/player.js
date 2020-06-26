const {Manager} = require("@lavacord/discord.js")
const base64 = require('base-64')

const nodes = [
    {id: "1", host: ef.tokens.LavalinkHost, port: ef.tokens.LavalinkPort, password: ef.tokens.LavalinkPass}
]

exports.init = async () => {
    ef.player = new Manager(ef, nodes, {
        user: ef.user.id,
        shards: 1
    })

    await ef.player.connect()
    
    ef.queue = {}
    ef.music = require("./music")
    ef.cache = {}
    ef.cache.youtube = {}
    ef.music.freeze = false

    ef.music.wakeUpLavalink = async () => {
        ef.music.freeze = true
        const req = await ef.http.delete(`https://api.heroku.com/apps/${ef.tokens.LavalinkHost.replace('.herokuapp.com', '')}/dynos`)
                            .set("Authorization", 'Basic ' + base64.encode(ef.tokens.HerokuCLIUserID + ':' + ef.tokens.HerokuCLIToken))
                            .set('Content-Type', 'application/json')
                            .set('Accept', 'application/vnd.heroku+json; version=3')
                            .catch(err => {
                                console.log(err)
                            })
        
        let interval = setInterval(async () => {
            const result = await ef.http.get(`https://${ef.tokens.LavalinkHost}/loadtracks}`)
            .catch(err => {
                if(err.status !== 503) {
                    ef.music.freeze = false
                    clearInterval(interval)
                }
            })
        }, 5000)
    }

    ef.player.on('error', async (error, node) => {
        ef.music.wakeUpLavalink()
    })
}