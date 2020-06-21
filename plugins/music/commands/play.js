const { search } = require("../../../utils/spotify")

exports.output = async ({message, guild, args}) => {
    var translations = {en: [], pl: [], ru: []}

    if(!args[0]) {
        translations.pl[0] = `${ef.emotes.markNo} Podaj nazwę filmu / utworu do odtworzenia.`
        translations.en[0] = `${ef.emotes.markNo} Enter the name of the movie / song to be played.`
        translations.ru[0] = `${ef.emotes.markNo} Введите название фильма / песни для воспроизведения.`
        ef.models.send({
            object: message,
            message: `${translations[guild.settings.language][0]}`,
            color: ef.colors.red
        })
        return
    }

    const voiceChannel = message.member.voiceChannel
    var track = args.join(" ")

    const spotify = await ef.utils.regex.spotify(track)
    if (spotify) {
        const result = await ef.utils.spotify.search(spotify[1])
        if (result) {
            track = `${result.artists[0].name} ${result.name}`
        } else {
            translations.pl[0] = `${ef.emotes.markNo} Nie znaleziono utworu.`
            translations.en[0] = `${ef.emotes.markNo} Track not found.`
            translations.ru[0] = `${ef.emotes.markNo} Фильм не найден.`
            ef.models.send({
                object: message,
                message: `${translations[guild.settings.language][0]}`,
                color: ef.colors.red
            })
            return
        }
    }

    await ef.music.player.getSong(track).then(async search => {
        if (search.loadType == 'NO_MATCHES') {

            if (ef.cache.youtube.hasOwnProperty(track)) {
                await play(ef.cache.youtube[track])
            } else {

                await ef.music.player.getSong('ytsearch: ' + track).then(async songs => {
                    if (songs.tracks.length == 0) {
                        translations.pl[0] = `${ef.emotes.markNo} Nie znaleziono utworu.`
                        translations.en[0] = `${ef.emotes.markNo} Track not found.`
                        translations.ru[0] = `${ef.emotes.markNo} Фильм не найден.`
                        ef.models.send({
                            object: message,
                            message: `${translations[guild.settings.language][0]}`,
                            color: ef.colors.red
                        })
                        return
                    }

                    ef.cache.youtube[track] = songs.tracks[0]

                    await play(songs.tracks[0])
                })
            }
        
        } else if (search.loadType == "PLAYLIST_LOADED") {

            if (!ef.queue[message.guild.id]) new ef.music.queue(message.guild.id)
            let queue = ef.queue[message.guild.id]
            let player = await ef.player.players.get(message.guild.id)
            if (!player) {
                player = await ef.player.join({
                    guild: message.guild.id,
                    channel: message.member.voiceChannel.id,
                    node: "1"
                }, { selfdeaf: true })
            }
  
            let mess = `**${search.tracks.length} Songs Queued**\n\`\`\`ini\n`
            search.tracks.forEach(async (song, i) => {
  
                queue.queue.push({
                    title: song.info.title.replace(/`/g, "'"),
                    channel: song.info.author,
                    length: song.info.length,
                    requester: message.author.tag,
                    url: song.info.uri,
                    track: song.track
                })
  
                i++
                if (i <= 20) {
                    mess += `[${(i < 10 ? '0' : '') + i}] ${song.info.title.replace(/`/g, "'").substring(0, 60)}\n`
                }
  
            })
  
            if (search.tracks.length >= 20) mess += `and ${search.tracks.length-20} more...`
  
            mess += `\n\`\`\``
  
            ef.models.send({
                object: message,
                message: mess,
            })
  
            setTimeout(async () => {
  
                let player = await ef.player.players.get(message.guild.id)

                if(!player.playing) {
                    let song = queue.queue.shift()
                    if(!song) return
                    ef.music.player.play(song, message).then(async () => {
                        var translations = {en: [], pl: [], ru: []}
                        translations.pl[0] = `${ef.emotes.markYes} Teraz odtwarzam: **${song.title}**.\n\Utwór z kanału: **${song.channel}**.`
                        translations.en[0] = `${ef.emotes.markYes} Now playing: **${song.title}**. \n\nTrack from channel: **${song.channel}**.`
                        translations.ru[0] = `${ef.emotes.markYes} **${song.title}** успешно добавлен в очередь. \n\nВидео с канала: **${song.channel}**.`
                        translations.pl[1] = `🔉 ${ef.queue[message.guild.id].volume}% • Duration: ${await ef.utils.time.formatLength(song.length) || 'N/A'} • Requested by ${song.req}`
                        translations.en[1] = `🔉 ${ef.queue[message.guild.id].volume}% • Duration: ${await ef.utils.time.formatLength(song.length) || 'N/A'} • Requested by ${song.req}`
                        translations.ru[1] = `🔉 ${ef.queue[message.guild.id].volume}% • Запрошенный ${song.req}`
            
        
                        const url = (song.url.startsWith("https://www.youtube.com/") ? `https://i.ytimg.com/vi/${song.url.replace("https://www.youtube.com/watch?v=", "")}/hqdefault.jpg` : ``)

                        ef.models.send({
                            object: message,
                            message: `${translations[guild.settings.language][0]}`,
                            thumbnail: url,
                            footer: `${translations[guild.settings.language][1]}`
                        })
                    })
                }
            }, 300)

        } else {
            await play(search.tracks[0])
        }
    })


    function play(song) {
        if(!song) {
            translations.pl[0] = `${ef.emotes.markNo} Nie znaleziono utworu.`
            translations.en[0] = `${ef.emotes.markNo} Track not found.`
            translations.ru[0] = `${ef.emotes.markNo} Фильм не найден.`
            ef.models.send({
                object: message,
                message: `${translations[guild.settings.language][0]}`,
                color: ef.colors.red
            })
            return
        }
        
        var parsedSong = {
            title: song.info.title.replace(/`/g, "'"),
            channel: song.info.author,
            length: song.info.length,
            req: message.author.tag,
            url: song.info.uri,
            track: song.track,
            paused: false
        }

        ef.music.player.play(parsedSong, message).then(async type => {
            var translations = {en: [], pl: [], ru: []}
            
            const url = (parsedSong.url.startsWith("https://www.youtube.com/") ? `https://i.ytimg.com/vi/${parsedSong.url.replace("https://www.youtube.com/watch?v=", "")}/hqdefault.jpg` : ``)

            if(type == "play") {
                var translations = {en: [], pl: [], ru: []}
                translations.pl[0] = `${ef.emotes.markYes} Teraz odtwarzam: **${parsedSong.title}**.\n\Utwór z kanału: **${parsedSong.channel}**.`
                translations.en[0] = `${ef.emotes.markYes} Now playing: **${parsedSong.title}**. \n\nTrack from channel: **${parsedSong.channel}**.`
                translations.ru[0] = `${ef.emotes.markYes} **${parsedSong.title}** успешно добавлен в очередь. \n\nВидео с канала: **${parsedSong.channel}**.`
                translations.pl[1] = `🔉 ${ef.queue[message.guild.id].volume}% • Duration: ${await ef.utils.time.formatLength(parsedSong.length) || 'N/A'} • Requested by ${parsedSong.req}`
                translations.en[1] = `🔉 ${ef.queue[message.guild.id].volume}% • Duration: ${await ef.utils.time.formatLength(parsedSong.length) || 'N/A'} • Requested by ${parsedSong.req}`
                translations.ru[1] = `🔉 ${ef.queue[message.guild.id].volume}% • Запрошенный ${parsedSong.req}`
    

                ef.models.send({
                    object: message,
                    message: `${translations[guild.settings.language][0]}`,
                    thumbnail: url,
                    footer: `${translations[guild.settings.language][1]}`
                })
            } else {
                translations.pl[0] = `${ef.emotes.markYes} Pomyślnie dodano utwór **${parsedSong.title}** do kolejki.\n\nUtwór z kanału: **${parsedSong.channel}**.`
                translations.en[0] = `${ef.emotes.markYes} **${parsedSong.title}** successfully added to the queue. \n\nTrack from channel: **${parsedSong.channel}**.`
                translations.ru[0] = `${ef.emotes.markYes} **${parsedSong.title}** успешно добавлен в очередь. \n\nВидео с канала: **${parsedSong.channel}**.`
                translations.pl[1] = `🔉 ${ef.queue[message.guild.id].volume}% • Duration: ${await ef.utils.time.formatLength(parsedSong.length) || 'N/A'} • Requested by ${parsedSong.req}`
                translations.en[1] = `🔉 ${ef.queue[message.guild.id].volume}% • Duration: ${await ef.utils.time.formatLength(parsedSong.length) || 'N/A'} • Requested by ${parsedSong.req}`
                translations.ru[1] = `🔉 ${ef.queue[message.guild.id].volume}% • Запрошенный ${parsedSong.req}`

                ef.models.send({
                    object: message,
                    message: `${translations[guild.settings.language][0]}`,
                    thumbnail: url,
                    footer: `${translations[guild.settings.language][1]}`
                })
            }
        })
    }
}

exports.data = {
    triggers: ['play'],
    description: {
        pl: 'Puszcza muzykę. Aby korzystać z tej funkcji musisz być połączony z kanałem głosowym.',
        en: 'Plays music. You must be connected to the voice channel in order to use this feature.',
        ru: 'Играет музыку. Вы должны быть подключены к голосовому каналу, чтобы использовать эту функцию.'
    },
    usage: {
        pl: [
            '{prefix}{command} <nazwa piosenki / filmu na YouTube / link do filmu na YouTube / link do piosenki na spotify>'
        ],
        en: [
            '{prefix}{command} <song / movie name on YouTube / video link on YouTube / song link on Spotify>'
        ],
        ru: [
            '{prefix}{command} <название песни / фильма на YouTube / ссылка на видео на YouTube>'
        ]
    },
    voice: true
}
