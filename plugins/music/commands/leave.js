exports.output = async ({message, guild, args}) => {
    var translations = {en: [], pl: [], ru: []}

    const player = ef.player.players.get(message.guild.id)

    if (player) await player.stop()

    if(!ef.queue[message.guild.id]) new ef.music.queue(message.guild.id)
  
    let queue = ef.queue[message.guild.id]
    queue.songs = []
    queue.loop = false
    queue.repeat = false

    await ef.player.leave(message.guild.id)

    delete ef.queue[message.guild.id]

    translations.pl[3] = `${ef.emotes.markYes} Pomyślnie opuszczono kanał głosowy.`
    translations.en[3] = `${ef.emotes.markYes} Successfully left voice channel.`
    translations.ru[3] = `${ef.emotes.markYes} Успешно покинул голосовой канал.`
    ef.models.send({
        object: message,
        message: `${translations[guild.settings.language][3]}`
    })
}

exports.data = {
    triggers: ['leave'],
    description: {
        pl: 'Sprawia, że bot opuszcza kanał. (Bot automatycznie opuszcza kanał po 10s od opuszczenia kanału przez ostatniego użytkownika.',
        en: 'Makes the bot leave the channel. (Bot automatically leaves the channel 10s after the last user left the channel.',
        ru: 'Заставляет бота покинуть канал. (Бот автоматически покидает канал через 10 секунд после того, как последний пользователь покинул канал.'
    },
    usage: [
        '{prefix}{command}'
    ],
    voice: true,
    disable: true
}
