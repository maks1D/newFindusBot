const { Manager } = require("@lavacord/discord.js")

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
                            .set("Authorization", 'Basic ' + Buffer.from(ef.tokens.HerokuCLIUserID + ':' + ef.tokens.HerokuCLIToken).toString('base64'))
                            .set('Content-Type', 'application/json')
                            .set('Accept', 'application/vnd.heroku+json; version=3')
                            .catch(err => {
                                console.log(err)
                            })
        
        let interval = setInterval(async () => {
            const result = await ef.http.get(`https://${ef.tokens.LavalinkHost}/loadtracks}`)
            .catch(err => {
                if(err.status !== 503 && ef.player.nodes.get("1").connected === true) {
                    
                    let temp = ef.player.voiceStates
                    temp.forEach(async tmp => {
                        await ef.player.leave(tmp.guild_id)
                        if (ef.queue[tmp.guild_id].nowPlaying !== '') {
                        
                            let message = ef.queue[tmp.guild_id].message
                            let song = ef.queue[tmp.guild_id].nowPlaying

                            ef.queue[tmp.guild_id].revoke = false

                            ef.music.player.play(song, message).then(async () => {
                                var translations = {en: [], pl: [], ru: []}
                                translations.pl[0] = `${ef.emotes.markYes} Teraz odtwarzam: **${song.title}**.\n\nUtwór z kanału: **${song.channel}**.`
                                translations.en[0] = `${ef.emotes.markYes} Now playing: **${song.title}**. \n\nTrack from channel: **${song.channel}**.`
                                translations.ru[0] = `${ef.emotes.markYes} **${song.title}** успешно добавлен в очередь. \n\nВидео с канала: **${song.channel}**.`
                                translations.pl[1] = `🔉 ${ef.queue[message.guild.id].volume}% • Duration: ${await ef.utils.time.formatLength(song.length) || 'N/A'} • Requested by ${song.req}`
                                translations.en[1] = `🔉 ${ef.queue[message.guild.id].volume}% • Duration: ${await ef.utils.time.formatLength(song.length) || 'N/A'} • Requested by ${song.req}`
                                translations.ru[1] = `🔉 ${ef.queue[message.guild.id].volume}% • Запрошенный ${song.req}`
                    
                                var guilds = await ef.db.findDoc('servers')
                                var guild = 0
                
                                guilds.forEach(server => {
                                    if(server.id == message.guild.id){
                                        guild = server
                                    }
                                });
                
                                if(guild == 0) {
                                    guild = {settings: {language: 'en'}}
                                }

                                const url = (song.url.startsWith("https://www.youtube.com/") ? `https://i.ytimg.com/vi/${song.url.replace("https://www.youtube.com/watch?v=", "")}/hqdefault.jpg` : ``)
        
                                ef.models.send({
                                    object: message,
                                    message: `${translations[guild.settings.language][0]}`,
                                    thumbnail: url,
                                    footer: `${translations[guild.settings.language][1]}`
                                })
                            })
                        }
                    })

                    let keys = Object.keys(ef.queue)

                    for (let i = 0; i < keys.length; i++) {
                        if (ef.queue[keys[i]].revoke === false) {
                            if (ef.queue[keys[i]].nowPlaying !== '') {
                        
                                let message = ef.queue[keys[i]].message
                                let song = ef.queue[keys[i]].nowPlaying

                                await ef.player.leave(message.guild.id)
    
                                ef.music.player.play(song, message).then(async () => {
                                    var translations = {en: [], pl: [], ru: []}
                                    translations.pl[0] = `${ef.emotes.markYes} Teraz odtwarzam: **${song.title}**.\n\nUtwór z kanału: **${song.channel}**.`
                                    translations.en[0] = `${ef.emotes.markYes} Now playing: **${song.title}**. \n\nTrack from channel: **${song.channel}**.`
                                    translations.ru[0] = `${ef.emotes.markYes} **${song.title}** успешно добавлен в очередь. \n\nВидео с канала: **${song.channel}**.`
                                    translations.pl[1] = `🔉 ${ef.queue[message.guild.id].volume}% • Duration: ${await ef.utils.time.formatLength(song.length) || 'N/A'} • Requested by ${song.req}`
                                    translations.en[1] = `🔉 ${ef.queue[message.guild.id].volume}% • Duration: ${await ef.utils.time.formatLength(song.length) || 'N/A'} • Requested by ${song.req}`
                                    translations.ru[1] = `🔉 ${ef.queue[message.guild.id].volume}% • Запрошенный ${song.req}`
                        
                                    var guilds = await ef.db.findDoc('servers')
                                    var guild = 0
                    
                                    guilds.forEach(server => {
                                        if(server.id == message.guild.id){
                                            guild = server
                                        }
                                    });
                    
                                    if(guild == 0) {
                                        guild = {settings: {language: 'en'}}
                                    }
    
                                    const url = (song.url.startsWith("https://www.youtube.com/") ? `https://i.ytimg.com/vi/${song.url.replace("https://www.youtube.com/watch?v=", "")}/hqdefault.jpg` : ``)
            
                                    ef.models.send({
                                        object: message,
                                        message: `${translations[guild.settings.language][0]}`,
                                        thumbnail: url,
                                        footer: `${translations[guild.settings.language][1]}`
                                    })
                                })
                            }
                            ef.queue[keys[i]].revoke = false
                        }
                    }

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