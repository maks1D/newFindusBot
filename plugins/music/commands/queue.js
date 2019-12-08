exports.output = async ({message, guild, args}) => {
    async function emoji(emojiname) { return await ef.utils.emoji.get(emojiname, message) }
    
    if(!message.member.voiceChannel) {
        ef.models.send({
            object: message,
            message: `${await emoji("markNo")} Nie jesteś połączony z żadnym kanałem głosowym.`,
            color: ef.colors.red
        })
    } else {
        if(!message.guild.voiceConnection){
            ef.models.send({
                object: message,
                message: `${await emoji("markNo")} Nie jestem obecnie połączony z żadnym kanałem głosowym.`,
                color: ef.colors.red
            })
            return
        } else if(message.guild.voiceConnection.channel.id != message.member.voiceChannel.id) {
            ef.models.send({
                object: message,
                message: `${await emoji("markNo")} Nie jestem obecnie połączony z tym kanałem głosowym.`,
                color: ef.colors.red
            })
            return
        } 
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
                message: `${await emoji("markNo")} Nic nie jest aktualnie odtwarzane.`,
                color: ef.colors.red
            })
        }
    }
}

exports.data = {
    triggers: ['queue'],
    description: 'Pokazuje kolejkę odtwarania na serwerze.',
    usage: [
        '{prefix}{command}'
    ]
}
