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
}

exports.data = {
    triggers: ['nowplaying', 'np'],
    description: {
        pl: 'Pokazuje informacje o aktualnie odtwarzanej piosence.',
        en: 'Shows info about currently playing song.',
        ru: 'Shows info about currently playing song.'
    },
    usage: [
        '{prefix}{command}'
    ],
    voice: true,
    disabled: true
}
