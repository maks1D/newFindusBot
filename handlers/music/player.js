const q = require('./queue')
const { URLSearchParams } = require("url")

const play = async (song, message) => {

    return new Promise(async (resolve, reject) => {
        if(!ef.queue[message.guild.id]) {
            new q(message.guild.id)
        }

        var player = await ef.player.players.get(message.guild.id)

        ef.queue[message.guild.id].channel = message.channel.id
        ef.queue[message.guild.id].message = message

        if (ef.player.nodes.get("1").connected === false || ef.player.nodes.get("1").stats.memory.free < 40000000) {
            
            let parsedSong = Object.assign({
                title: '',
                url: '',
                paused: false,
                length: 0,
                req: '',
                track: '',
                pd: 0,
                date: Date.now()
            }, song)

            if (ef.queue[message.guild.id].nowPlaying == '') {
                ef.queue[message.guild.id].revoke = true
                ef.queue[message.guild.id].nowPlaying = parsedSong
            } else {
                ef.queue[message.guild.id].queue.push(parsedSong)
            }
            return resolve('wakeup')
        }

        if(!player || ef.queue[message.guild.id].revoke === true) {
            player = await ef.player.join({
                guild: message.guild.id,
                channel: message.member.voiceChannel.id,
                node: "1"
            }, { selfdeaf: true }).catch(e => {
                console.log(e)
                resolve('wakeup')
            })
        }

        if(player.playing) {
            let parsedSong = Object.assign({
                title: '',
                url: '',
                paused: false,
                length: 0,
                req: '',
                track: '',
                pd: 0,
                date: Date.now()
            }, song)
            ef.queue[message.guild.id].queue.push(parsedSong)

            resolve('queue')
        } else {
            try {
                await player.play(song.track)
            } catch (error) {
                return resolve('wakeup')
            }
            let parsedSong = Object.assign({
                title: '',
                url: '',
                paused: false,
                length: 0,
                req: '',
                track: '',
                pd: 0,
                date: Date.now()
            }, song)
            ef.queue[message.guild.id].nowPlaying = parsedSong

            player.once('end', async data => {
                if(ef.queue[message.guild.id].loop) {
                    var song = ef.queue[message.guild.id].nowPlaying
                    song.req = "Loop"
                    return play(song, message)
    
                }
    
                if(ef.queue[message.guild.id].repeat > 0) {
                    ef.queue[message.guild.id].repeat --
                    var song = ef.queue[message.guild.id].nowPlaying
                    song.req = "Loop"
                    return play(song, message)
    
                }
    
                var next = ef.queue[message.guild.id].queue.shift()
    
                if(!next) {
                    return ef.queue[message.guild.id].nowPlaying = ''
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

const YouTube = require('youtube-node')
const YouTube_Search = new YouTube()
YouTube_Search.setKey(ef.tokens.youtubeAPI)

const getSong = async search => {

    let records = 15

    let promise = await new Promise((resolve, reject) => {
        YouTube_Search.search(search, records, (err, result) => {
            if (err) return resolve('https://youtube.com/watch?v=error')

            if (result.items[0] === undefined) return resolve('https://youtube.com/watch?v=error')

            let url 

            for (let i = 0; i < result.items.length; i++) {
                if (result.items[i].id.kind === 'youtube#video') {
                    url = 'https://youtube.com/watch?v='
                    return resolve(url + result.items[i].id.videoId)
                } else if (result.items[i].id.kind === 'youtube#playlist') {
                    url = 'https://www.youtube.com/playlist?list='
                    return resolve(url + result.items[i].id.playlistId)
                }
            }

            return resolve('https://youtube.com/watch?v=error')
        })
    })

    const params = new URLSearchParams()
    params.append("identifier", await promise)

    return new Promise(async (resolve, reject) => {
        const result = await ef.http.get(`https://${ef.tokens.LavalinkHost}/loadtracks?${params}`)
                                    .set("Authorization", ef.tokens.LavalinkPass)
                                    .catch(err => {
                                        console.log(err)
                                        if (err.status === 500) {
                                            resolve('OutOfMemory')
                                        }
                                        return null
                                    })
        if (result === null) return
        

        if(!result) {
            resolve('OutOfMemory')
        }

        resolve(result.body)
    })
}

module.exports.play = play
module.exports.getSong = getSong