exports.output = async ({message, guild, args}) => {
    var translations = {en: [], pl: [], ru: []}

    async function check() {
        if(!message.member.voiceChannel) {
            translations.pl[0] = `${ef.emotes.markNo} Nie jesteś połączony z żadnym kanałem głosowym.`
            translations.en[0] = `${ef.emotes.markNo} You are not connected to any voice channel.`
            translations.ru[0] = `${ef.emotes.markNo} Вы не подключены к какому-либо голосовому каналу.`
            ef.models.send({
                object: message,
                message: `${translations[guild.settings.language][0]}`,
                color: ef.colors.red
            })
            return -1
        } else {
            if(message.guild.voiceConnection && message.guild.voiceConnection.channel.id != message.member.voiceChannel.id) {
                translations.pl[0] = `${ef.emotes.markNo} Nie jestem obecnie połączony z tym kanałem głosowym.`
                translations.en[0] = `${ef.emotes.markNo} I am not currently connected to this voice channel.`
                translations.ru[0] = `${ef.emotes.markNo} В настоящее время я не подключен к этому голосовому каналу.`
                ef.models.send({
                    object: message,
                    message: `${translations[guild.settings.language][0]}`,
                    color: ef.colors.red
                })
                return -1
            }
        }
        return 0
    }

    if(!ef.roles.developers.includes(message.author.id) || !ef.queue[message.guild.id]) { if (await check() == -1) return }

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
    if(args[0] == '--noleave') {
        if(ef.roles.developers.includes(message.author.id)) {
            if(ef.queue[message.guild.id]) {
                ef.queue[message.guild.id].autoleave = false
                translations.pl[0] = `${ef.emotes.markYes} Wyłączono auto leave!`
                translations.en[0] = `${ef.emotes.markYes} Auto leave disabled!`
                translations.ru[0] = `${ef.emotes.markYes} Авто оставить отключенным!`
                ef.models.send({
                    object: message,
                    message: `${translations[guild.settings.language][0]}`,
                    color: ef.colors.red
                })
                ef.models.send({
                    object: message,
                    message: `${ef.emotes.markYes} Wyłączono auto leave!`
                })
                return
            } else {
                translations.pl[0] = `${ef.emotes.markNo} Nie jestem aktualnie połączony z żadnym kanałem głosowym.`
                translations.en[0] = `${ef.emotes.markNo} I am not currently connected to any voice channel.`
                translations.ru[0] = `${ef.emotes.markNo} В настоящее время я не подключен ни к одному голосовому каналу.`
                ef.models.send({
                    object: message,
                    message: `${translations[guild.settings.language][0]}`,
                    color: ef.colors.red
                })
                return
            }
        }
    }
    
    var song = await ef.player.search(args.join(' '))
    if(song == 'noVideo') {
        translations.pl[0] = `${ef.emotes.markNo} Nie znaleziono filmu.`
        translations.en[0] = `${ef.emotes.markNo} Movie not found.`
        translations.ru[0] = `${ef.emotes.markNo} Фильм не найден.`
        ef.models.send({
            object: message,
            message: `${translations[guild.settings.language][0]}`,
            color: ef.colors.red
        })
        return
    }
    if(!message.guild.voiceConnection){
        await message.member.voiceChannel.join()
    }
    if(ef.queue[message.guild.id]){
        ef.queue[message.guild.id].queue.push(song)
    } else {
        ef.queue[message.guild.id] = {
            player: '',
            nowPlaying: '',
            queue: [song],
            connection: message.guild.voiceConnection,
            volume: 100,
            autoleave: true,
            autoreconnect: false,
            autounmute: false
        }
    }
    translations.pl[0] = `${ef.emotes.markYes} Pomyślnie dodano film **${song.title}** do kolejki.\n\nWideo z kanału: **${song.channel}**.`
    translations.en[0] = `${ef.emotes.markYes} **${song.title}** successfully added to the queue. \n\nVideo from channel: **${song.channel}**.`
    translations.ru[0] = `${ef.emotes.markYes} **${song.title}** успешно добавлен в очередь. \n\nВидео с канала: **${song.channel}**.`
    translations.pl[1] = `🔉 ${ef.queue[message.guild.id].volume}% • Requested by ${message.author.tag}`
    translations.en[1] = `🔉 ${ef.queue[message.guild.id].volume}% • Requested by ${message.author.tag}`
    translations.ru[1] = `🔉 ${ef.queue[message.guild.id].volume}% • Запрошенный ${message.author.tag}`
    ef.models.send({
        object: message,
        message: `${translations[guild.settings.language][0]}`,
        thumbnail: song.imageURL,
        footer: `${translations[guild.settings.language][1]}`
    })
    ef.player.play(message)
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
            '{prefix}{command} <nazwa piosenki / filmu na YouTube / link do filmu na YouTube>'
        ],
        en: [
            '{prefix}{command} <song / movie name on YouTube / video link on YouTube>'
        ],
        ru: [
            '{prefix}{command} <название песни / фильма на YouTube / ссылка на видео на YouTube>'
        ]
    }
}
