const q = require('./queue')

const play = async (song, message) => {

    return new Promise(async (resolve, reject) => {
        if(!ef.queue[message.guild.id]) {
            new q(message.guild.id)
        }

        var player = await ef.player.players.get(message.guild.id)

        if(!player) {
            player = await ef.player.join({
                guild: message.guild.id,
                channel: message.member.voiceChannel.id,
                node: "1"
            }, { selfdeaf: true })
        }

        ef.queue[message.guild.id].channel = message.channel.id

        if(player.playing) {
            ef.queue[message.guild.id].queue.push(song)

            resolve('queue')
        } else {
            await player.play(song.track)
            ef.queue[message.guild.id].nowPlaying = song

            player.once('end', async data => {
                if(ef.queue[message.guild.id].loop) {
                    var song = ef.queue[message.guild.id].nowPlaying
                    song.req = "Loop"
                    return play(song, message)
    
                }
    
                if(ef.queue[message.guild.id].repeat) {
                    ef.queue[message.guild.id].repeat = false
                    var song = ef.queue[message.guild.id].nowPlaying
                    song.req = "Loop"
                    return play(song, message)
    
                }
    
                var next = ef.queue[message.guild.id].queue.shift()
    
                if(!next) {
                    return
                } else {
                    setTimeout(() => {
                        play(next, message)
                    }, 400)
    
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
    
                    var player = await ef.player.players.get(message.guild.id)
                    const url = (next.url.startsWith("https://www.youtube.com/") ? `https://i.ytimg.com/vi/${next.url.replace("https://www.youtube.com/watch?v=", "")}/hqdefault.jpg` : ``)
                    var translations = {en: [], pl: [], ru: []}
                    translations.pl[0] = `${ef.emotes.markYes} Teraz odtwarzam: **${next.title}**.\n\Utwór z kanału: **${next.channel}**.`
                    translations.en[0] = `${ef.emotes.markYes} Now playing: **${next.title}**. \n\nTrack from channel: **${next.channel}**.`
                    translations.ru[0] = `${ef.emotes.markYes} **${next.title}** успешно добавлен в очередь. \n\nВидео с канала: **${next.channel}**.`
                    translations.pl[1] = `🔉 ${ef.queue[message.guild.id].volume}% • Duration: ${await ef.utils.time.formatLength(next.length) || 'N/A'} • Requested by ${next.req}`
                    translations.en[1] = `🔉 ${ef.queue[message.guild.id].volume}% • Duration: ${await ef.utils.time.formatLength(next.length) || 'N/A'} • Requested by ${next.req}`
                    translations.ru[1] = `🔉 ${ef.queue[message.guild.id].volume}% • Запрошенный ${next.req}`
        
                    if (ef.queue[message.guild.id].npmessages) {
                        ef.models.send({
                            object: message,
                            message: `${translations[guild.settings.language][0]}`,
                            thumbnail: url,
                            footer: `${translations[guild.settings.language][1]}`
                        })
                    }
                }
    
                return
            })

            resolve('play')
        }
    })
}

const getSong = async string => {
    return new Promise(async (resolve, reject) => {
        const result = await ef.http.get(`https://${ef.tokens.LavalinkHost}/loadtracks?identifier=${encodeURIComponent(string)}`)
                                    .set("Authorization", ef.tokens.LavalinkPass)
                                    .catch(err => {
                                        console.log(err)
                                        return null
                                    })
        if(!result) {
            throw 'Error. Please try again'
        }

        resolve(result.body)
    })
}

module.exports.play = play
module.exports.getSong = getSong