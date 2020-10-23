exports.output = async ({message, guild, args}) => { 
    var translations = {en: [], pl: [], ru: []}

    const player =  ef.player.players.get(message.guild.id)

    if (!player) {
        translations.pl[0] = `${ef.emotes.markNo} Nic nie jest aktualnie odtwarzane.`
        translations.en[0] = `${ef.emotes.markNo} Nothing is currently playing.`
        translations.ru[0] = `${ef.emotes.markNo} Ничего в данный момент не играет.`
        ef.models.send({
            object: message,
            message: `${translations[guild.settings.language][0]}`,
            color: ef.colors.red
        })
    }

    if (args[0]) {
        if (args[0].slice(args[0].length - 1, args[0].length) == '%') args[0] = args[0].slice(0, args[0].length - 1)

        if((args[0] && args[0] !== 'earrape' && isNaN(args[0])) || args[0] < 0 || args[0] > 200) {
            translations.pl[0] = `${ef.emotes.markNo} Podaj poprawną głośność.`
            translations.en[0] = `${ef.emotes.markNo} Enter the correct volume.`
            translations.ru[0] = `${ef.emotes.markNo} Введите правильную громкость.`
            ef.models.send({
                object: message,
                message: `${translations[guild.settings.language][0]}`,
                color: ef.colors.red
            })
            return 
        }

        let volume = (args[0] == 'earrape' ? 300 : args[0])
    
        await player.volume(volume)
    }
    
    let first = Math.round(player.state.volume/20)
    let second = 10-Math.round(player.state.volume/20)

    first > 10 ? first = 10 : first = first
    second < 0 ? second = 0 : second = second

    translations.pl[0] = `**Głośność:**\n[${`▬`.repeat(first)}](https://youtu.be/dQw4w9WgXcQ)${`▬`.repeat(second)} \`${player.state.volume <= 200 ? player.state.volume + '%' : 'Earrape'}\``,
    translations.en[0] = `**Volume:**\n[${`▬`.repeat(first)}](https://youtu.be/dQw4w9WgXcQ)${`▬`.repeat(second)} \`${player.state.volume <= 200 ? player.state.volume + '%' : 'Earrape'}\``,
    translations.ru[0] = `**громкость:**\n[${`▬`.repeat(first)}](https://youtu.be/dQw4w9WgXcQ)${`▬`.repeat(second)} \`${player.state.volume <= 200 ? player.state.volume + '%' : 'Earrape'}\``,
    
    ef.models.send({
        object: message,
        message: `${translations[guild.settings.language][0]}`
    })
}

exports.data = {
    triggers: ['volume', 'vol'],
    description: {
        pl: 'Ustawia głośność odtwarzania filmu na kanale głosowym. Od 0 do 200. Domyślna głośność to 100.',
        en: 'Sets the volume of video playback on the voice channel. From 0 to 200. Default volume is 100.',
        ru: 'Устанавливает громкость воспроизведения видео на голосовом канале. От 0 до 200. громкость по умолчанию - 100.'
    },
    usage: {
        pl: [
            '{prefix}{command} <głośność>',
            '{prefix}{command} earrape'
        ],
        en: [
            '{prefix}{command} <volume>',
            '{prefix}{command} earrape'
        ],
        ru: [
            '{prefix}{command} <громкость>',
            '{prefix}{command} earrape'
        ]
    },
    voice: true,
    disable: true
}
