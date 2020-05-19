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
                translations.pl[0] = `${ef.emotes.markNo} Nie jestem obecnie połączony z żadnym kanałem głosowym.`
                translations.en[0] = `${ef.emotes.markNo} I am not connected to any voice channel.`
                translations.ru[0] = `${ef.emotes.markNo} Я не подключен ни к одному голосовому каналу`
                ef.models.send({
                    object: message,
                    message: `${translations[guild.settings.language][0]}`,
                    color: ef.colors.red
                })
                return -1
            } else if(message.guild.voiceConnection.channel.id != message.member.voiceChannel.id) {
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
        translations.pl[0] = `Aktualna głośność wynosi **${ef.queue[message.guild.id].volume}%**.`
        translations.en[0] = `Current volume is **${ef.queue[message.guild.id].volume}%**.`
        translations.ru[0] = `Текущая громкость **${ef.queue[message.guild.id].volume}%**.`
        return ef.models.send({
            object: message,
            message: `${translations[guild.settings.language][0]}`
        })
    }
    if(args[0] !== 'earrape' && isNaN(args[0])) {
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
    var state = await ef.player.volume(message, args)
    if(state == true) {
        translations.pl[0] = `${ef.emotes.markYes} Pomyślnie ustawiono nową głośność na **${ef.queue[message.guild.id].volume}%**.`
        translations.en[0] = `${ef.emotes.markYes} Successfully set the new volume to **${ef.queue[message.guild.id].volume}%**.`
        translations.ru[0] = `${ef.emotes.markYes} Успешно установить новую громкость на **${ef.queue[message.guild.id].volume}%**.`
        ef.models.send({
            object: message,
            message: `${translations[guild.settings.language][0]}`
        })
    } else {
        translations.pl[0] = `${ef.emotes.markNo} Nie udało się zmienić głośności.`
        translations.en[0] = `${ef.emotes.markNo} Failed to change volume.`
        translations.ru[0] = `${ef.emotes.markNo} Не удалось изменить громкость.`
        ef.models.send({
            object: message,
            message: `${translations[guild.settings.language][0]}`,
            color: ef.colors.red
        })
    }
}

exports.data = {
    triggers: ['volume', 'vol'],
    description: {
        pl: 'Ustawia głośność odtwarzania filmu na kanale głosowym. Od 0 do 1000. Domyślna głośność to 100.',
        en: 'Sets the volume of video playback on the voice channel. From 0 to 1000. Default volume is 100.',
        ru: 'Устанавливает громкость воспроизведения видео на голосовом канале. От 0 до 1000. громкость по умолчанию - 100.'
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
    }
}
