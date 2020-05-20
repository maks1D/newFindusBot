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
    
    var state = await ef.player.resume(message)
    if(state == true) {
        translations.pl[0] = `${ef.emotes.markYes} Pomyślnie wznowiono odtwarzanie utworu.`
        translations.en[0] = `${ef.emotes.markYes} Music resumed successfully.`
        translations.ru[0] = `${ef.emotes.markYes} Музыка возобновилась успешно.`
        ef.models.send({
            object: message,
            message: `${translations[guild.settings.language][0]}`
        })
    } else {
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
    triggers: ['resume'],
    description: {
        pl: 'Wznawia odtwarzanie muzyki na kanale głosowym.',
        en: 'Resumes playing music on the voice channel.',
        ru: 'Возобновляет воспроизведение музыки на голосовом канале.'
    },
    usage: [
        '{prefix}{command}'
    ]
}
