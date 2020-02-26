exports.output = async ({message, guild, args}) => {
    async function check() {
        if(!message.member.voiceChannel) {
            ef.models.send({
                object: message,
                message: `${ef.emotes.markNo} Nie jesteś połączony z żadnym kanałem głosowym.`,
                color: ef.colors.red
            })
            return -1
        } else {
            if(!message.guild.voiceConnection){
                ef.models.send({
                    object: message,
                    message: `${ef.emotes.markNo} Nie jestem obecnie połączony z żadnym kanałem głosowym.`,
                    color: ef.colors.red
                })
                return -1
            } else if(message.guild.voiceConnection.channel.id != message.member.voiceChannel.id) {
                ef.models.send({
                    object: message,
                    message: `${ef.emotes.markNo} Nie jestem obecnie połączony z tym kanałem głosowym.`,
                    color: ef.colors.red
                })
                return -1
            }
        }
        return 0
    }

    if(!ef.roles.developers.includes(message.author.id) || !ef.queue[message.guild.id]) { if (await check() == -1) return }
    
    if(ef.queue[message.guild.id].nowPlaying != '') {
        var queue = `:play_pause: **Aktualnie odtwarzane:**\n\n**-${ef.queue[message.guild.id].nowPlaying.title}** od wykonawcy \`${ef.queue[message.guild.id].nowPlaying.channel}\``
        if(ef.queue[message.guild.id].queue.length > 0) {
            var cache
            queue += `\n\n:newspaper: **Kolejka:**\n`
            for(var i = 0; i < ef.queue[message.guild.id].queue.length; i++) {
                cache = queue
                queue += `\n**[${i}] -${ef.queue[message.guild.id].queue[i].title}** od wykonawcy \`${ef.queue[message.guild.id].queue[i].channel}\``
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
        ef.models.send({
            object: message,
            message: `${ef.emotes.markNo} Nic nie jest aktualnie odtwarzane.`,
            color: ef.colors.red
        })
    }
    
}

exports.data = {
    triggers: ['queue'],
    description: 'Pokazuje kolejkę odtwarania na serwerze.',
    usage: [
        '{prefix}{command}'
    ]
}
