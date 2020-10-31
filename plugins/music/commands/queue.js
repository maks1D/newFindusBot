exports.output = async ({message, guild, args}) => {
    var translations = {en: [], pl: [], ru: []}
    
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
                queue += `\n**[${i}] - ${ef.queue[message.guild.id].queue[i].title.slice(0, 60)}** ${translations[guild.settings.language][1]} \`${ef.queue[message.guild.id].queue[i].channel}\``
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
    ],
    voice: true,
    disabled: true
}
