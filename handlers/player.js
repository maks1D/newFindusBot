const {Manager} = require("@lavacord/discord.js")

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

    ef.player.on('error', (error, node) => {
        console.log(error)
    })
}