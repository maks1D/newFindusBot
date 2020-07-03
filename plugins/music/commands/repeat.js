exports.output = async ({message, guild, args}) => {
    var translations = {en: [], pl: [], ru: []}

    const player =  ef.player.players.get(message.guild.id)

    if (!player || !player.playing) {
        translations.pl[0] = `${ef.emotes.markNo} Nic nie jest aktualnie odtwarzane.`
        translations.en[0] = `${ef.emotes.markNo} Nothing is currently playing.`
        translations.ru[0] = `${ef.emotes.markNo} Ничего в данный момент не играет.`
        ef.models.send({
            object: message,
            message: `${translations[guild.settings.language][0]}`,
            color: ef.colors.red
        })
    }
    
    if (!ef.queue[message.guild.id]) new ef.music.queue(message.guild.id)
    let queue = ef.queue[message.guild.id]

    if (queue.loop) {
        queue.loop = false
    } 
    
    if (args[0] && !isNaN(args[0])) {
        queue.repeat = parseInt(args[0])

        translations.pl[0] = `${ef.emotes.markYes} Pomyślnie włączono pętlę na ${parseInt(args[0])} powtórzeń.`
        translations.en[0] = `${ef.emotes.markYes} Successfully enabled repeat for ${parseInt(args[0])} times.`
        translations.ru[0] = translations.en[0]
        ef.models.send({
            object: message,
            message: `${translations[guild.settings.language][0]}`
        })
    } else if (args[0] && isNaN(args[0])) {
        translations.pl[0] = `${ef.emotes.markYes} Podaj poprawne argumenty.`
        translations.en[0] = `${ef.emotes.markYes} Provide valid arguments.`
        translations.ru[0] = translations.en[0]
        ef.models.send({
            object: message,
            message: `${translations[guild.settings.language][0]}`
        })
    } else {
        translations.pl[0] = `Pozostało jeszcze ${queue.repeat} powtórzeń.`
        translations.en[0] = `Song will be repeated ${queue.repeat} more times.`
        translations.ru[0] = translations.en[0]
        ef.models.send({
            object: message,
            message: `${translations[guild.settings.language][0]}`
        })
    }
}

exports.data = {
    triggers: ['repeat', 'rep'],
    description: {
        pl: 'Powtarza wybraną piosenkę x razy.',
        en: 'Loops current song for x times.',
        ru: 'Loops current song for x times.'
    },
    usage: [
        '{prefix}{command}',
        '{prefix}{command} <number of repeats>'
    ],
    voice: true
}
