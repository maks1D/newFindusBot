exports.output = async ({message, guild, args}) => {
    var translations = {en: [], pl: [], ru: []}

    const player =  ef.player.players.get(message.guild.id)

    if (!player || !player.playing) {
        translations.pl[0] = `${ef.emotes.markNo} Nic nie jest aktualnie odtwarzane.`
        translations.en[0] = `${ef.emotes.markNo} Nothing is currently playing.`
        translations.ru[0] = `${ef.emotes.markNo} Ничего в данный момент не играет.`
        return ef.models.send({
            object: message,
            message: `${translations[guild.settings.language][0]}`,
            color: ef.colors.red
        })
    }
    
    if (!ef.queue[message.guild.id]) new ef.music.queue(message.guild.id)
    let queue = ef.queue[message.guild.id]

    if (queue.loop) {
        queue.loop = false

        translations.pl[0] = `${ef.emotes.markYes} Pomyślnie wyłączono pętlę.`
        translations.en[0] = `${ef.emotes.markYes} Successfully disabled loop.`
        translations.ru[0] = translations.en[0]
        ef.models.send({
            object: message,
            message: `${translations[guild.settings.language][0]}`
        })

    } else {
        queue.loop = true

        translations.pl[0] = `${ef.emotes.markYes} Pomyślnie włączono pętlę.`
        translations.en[0] = `${ef.emotes.markYes} Successfully enabled loop.`
        translations.ru[0] = translations.en[0]
        ef.models.send({
            object: message,
            message: `${translations[guild.settings.language][0]}`
        })
    }
}

exports.data = {
    triggers: ['loop'],
    description: {
        pl: 'Zapętla aktualnie odtwarzaną piosenkę.',
        en: 'Loops currently played song.',
        ru: 'Loops currently played song.'
    },
    usage: [
        '{prefix}{command}'
    ],
    voice: true
}
