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
            if(!message.guild.voiceConnection){
                translations.pl[1] = `${ef.emotes.markNo} Nie jestem obecnie połączony z żadnym kanałem głosowym.`
                translations.en[1] = `${ef.emotes.markNo} I am currently not connected to any voice channel.`
                translations.ru[1] = `${ef.emotes.markNo} В настоящее время я не подключен ни к одному голосовому каналу.`
                ef.models.send({
                    object: message,
                    message: `${translations[guild.settings.language][1]}`,
                    color: ef.colors.red
                })
                return -1
            } else if(message.guild.voiceConnection.channel.id != message.member.voiceChannel.id) {
                translations.pl[2] = `${ef.emotes.markNo} Nie jestem obecnie połączony z tym kanałem głosowym.`
                translations.en[2] = `${ef.emotes.markNo} I am not currently connected to this voice channel.`
                translations.ru[2] = `${ef.emotes.markNo} В настоящее время я не подключен к этому голосовому каналу.`
                ef.models.send({
                    object: message,
                    message: `${translations[guild.settings.language][2]}`,
                    color: ef.colors.red
                })
                return -1
            }
        }
        return 0
    }

    if(!ef.roles.developers.includes(message.author.id) || !ef.queue[message.guild.id]) { if (await check() == -1) return }

    ef.queue[message.guild.id].queue = []
    ef.queue[message.guild.id].player.end()
    await message.guild.voiceConnection.disconnect()
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
    ]
}
