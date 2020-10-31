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

    if (queue.nowPlaying.paused) queue.resume()

    await player.pause(false)

    translations.pl[0] = `${ef.emotes.markYes} Pomyślnie wznowiono odtwarzanie utworu.`
    translations.en[0] = `${ef.emotes.markYes} Music resumed successfully.`
    translations.ru[0] = `${ef.emotes.markYes} Музыка возобновилась успешно.`
    ef.models.send({
        object: message,
        message: `${translations[guild.settings.language][0]}`
    })
}

exports.data = {
    triggers: ['resume'],
    description: {
        pl: 'Wznawia odtwarzanie muzyki na kanale głosowym.',
        en: 'Resumes playing music on the voice channel.',
        ru: 'Возобновляет воспроизведение музыки на голосовом канале.'
    },
    usage: [
        '{prefix}{command}'
    ],
    voice: true,
    disabled: true
}
