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
    
    if(ef.queue[message.guild.id].nowPlaying != '') {
        translations.pl[0] = `:play_pause: **Aktualnie odtwarzane:**`
        translations.en[0] = `:play_pause: **Now playing:**`
        translations.ru[0] = `:play_pause: **Сейчас играет:**`
        translations.pl[1] = `od wykonawcy`
        translations.en[1] = `from the creator`
        translations.ru[1] = `от создателя`
        var queue = `${translations[guild.settings.language][0]}\n\n**-${ef.queue[message.guild.id].nowPlaying.title}** ${translations[guild.settings.language][1]} \`${ef.queue[message.guild.id].nowPlaying.channel}\``
        if(ef.queue[message.guild.id].queue.length > 0) {
            
            translations.pl[2] = `:newspaper: **Kolejka (${ef.queue[message.guild.id].queue.length}):**`
            translations.en[2] = `:newspaper: **Queue (${ef.queue[message.guild.id].queue.length}):**`
            translations.ru[2] = `:newspaper: **в очереди (${ef.queue[message.guild.id].queue.length}):**`
            var cache
            queue += `\n\n${translations[guild.settings.language][2]}\n`
            for(var i = 0; i < ef.queue[message.guild.id].queue.length; i++) {
                cache = queue
                queue += `\n**[${i}] - ${ef.queue[message.guild.id].queue[i].title}** ${translations[guild.settings.language][1]} \`${ef.queue[message.guild.id].queue[i].channel}\``
                if(queue.split('').length > 2000) {
                    queue = cache + '\n**...**'
                    break
                }
            }
            delete cache
        }
        ef.models.send({
            object: message,
            message: queue,
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
    triggers: ['queue'],
    description: {
        pl: 'Pokazuje kolejkę odtwarzania na serwerze.',
        en: 'Shows the play queue on the server.',
        ru: 'Показывает очередь воспроизведения на сервере.'
    },
    usage: [
        '{prefix}{command}'
    ]
}
