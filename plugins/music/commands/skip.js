exports.output = async ({message, guild, args}) => {
    var translations = {en: [], pl: [], ru: []}

    translations.pl[1] = `${ef.emotes.markNo} Nic nie jest aktualnie odtwarzane.`
    translations.en[1] = `${ef.emotes.markNo} Nothing is currently playing.`
    translations.ru[1] = `${ef.emotes.markNo} Ничего в данный момент не играет.`

    const player = ef.player.players.get(message.guild.id)

    if (!player || !player.playing) {
        return ef.models.send({
            object: message,
            message: `${translations[guild.settings.language][1]}`,
            color: ef.colors.red
        })
    }

    if(!args[0]){
        var current = ef.queue[message.guild.id].nowPlaying
        if(!ef.queue[message.guild.id]) new ef.music.queue(message.guild.id)

        let queue = ef.queue[message.guild.id]
        queue.loop = false
        queue.repeat = false

        await player.stop()

        translations.pl[0] = `${ef.emotes.markYes} Pomyślnie pominięto utwór **${current.title}**.`
        translations.en[0] = `${ef.emotes.markYes} Song **${current.title}** successfully skipped.`
        translations.ru[0] = `${ef.emotes.markYes} Песня **${current.title}** успешно пропущена.`
        ef.models.send({
            object: message,
            message: `${translations[guild.settings.language][0]}`,
        })
    } else {
        var id = parseInt(args[0])
        if(ef.queue[message.guild.id].nowPlaying == '') {
            ef.models.send({
                object: message,
                message: `${translations[guild.settings.language][1]}`,
                color: ef.colors.red
            })
        } else if(id + 1 <= ef.queue[message.guild.id].queue.length && id >= 0) {
            var curr = ef.queue[message.guild.id].queue[id]
            ef.queue[message.guild.id].queue.splice(id, 1)
            translations.pl[0] = `${ef.emotes.markYes} Pomyślnie pominięto utwór **${curr.title}**.`
            translations.en[0] = `${ef.emotes.markYes} Song **${curr.title}** successfully skipped.`
            translations.ru[0] = `${ef.emotes.markYes} Песня **${curr.title}** успешно пропущена.`
            ef.models.send({
                object: message,
                message: `${translations[guild.settings.language][0]}`,
            })
        } else if (ef.queue[message.guild.id].queue.length == 0){
            translations.pl[2] = `${ef.emotes.markNo} Nie ma żadnych utworów w kolejce. Użyj \`${ef.prefix}skip\`, aby pominąć aktualnie odtwarzany utwór.`
            translations.en[2] = `${ef.emotes.markNo} There are no songs in the queue. Use \`${ef.prefix}skip\`, to skip currently playing song.`
            translations.ru[2] = `${ef.emotes.markNo} В очереди нет песен. использование \`${ef.prefix}skip\`, чтобы пропустить текущую песню.`
            ef.models.send({
                object: message,
                message: `${translations[guild.settings.language][2]}`,
                color: ef.colors.red
            })
        } else if (!isNaN(args[0])) {
            translations.pl[2] = `${ef.emotes.markNo} Podaj numer utworu znajdujący się w kolejce.`
            translations.en[2] = `${ef.emotes.markNo} Enter the song number that's in the queue.`
            translations.ru[2] = `${ef.emotes.markNo} Введите номер песни, которая находится в очереди.`
            ef.models.send({
                object: message,
                message: `${translations[guild.settings.language][2]}`,
                color: ef.colors.red
            })
        } else {
            translations.pl[2] = `${ef.emotes.markNo} Podaj poprawny numer utworu.`
            translations.en[2] = `${ef.emotes.markNo} Please enter a valid song number.`
            translations.ru[2] = `${ef.emotes.markNo} Пожалуйста, введите правильный номер песни.`
            ef.models.send({
                object: message,
                message: `${translations[guild.settings.language][2]}`,
                color: ef.colors.red
            })
        }
    }
}

exports.data = {
    triggers: ['skip'],
    description: {
        pl: 'Pomija utwór.',
        en: 'Skip the song.',
        ru: 'Пропустить песню.'
    },
    usage: {
        pl: [
            '{prefix}{command}',
            '{prefix}{command} <numer utworu w kolejce>'
        ],
        en: [
            '{prefix}{command}',
            '{prefix}{command} <track number in queue>'
        ],
        ru: [
            '{prefix}{command}',
            '{prefix}{command} <номер трека в очереди>'
        ]
    },
    voice: true,
    disabled: true
}
