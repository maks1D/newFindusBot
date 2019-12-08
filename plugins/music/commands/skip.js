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
        if(!args[0]){
            var current = ef.queue[message.guild.id].nowPlaying
            var state = await ef.player.skip(message)
            if(state == true) {
                ef.models.send({
                    object: message,
                    message: `${await emoji("markYes")} Pomyślnie pominięto utwór **${current.title}**.`,
                })
            } else {
                ef.models.send({
                    object: message,
                    message: `${await emoji("markNo")} Nic nie jest aktualnie odtwarzane.`,
                    color: ef.colors.red
                })
            }
        } else {
            var id = parseInt(args[0])
            if(ef.queue[message.guild.id].nowPlaying == '') {
                ef.models.send({
                    object: message,
                    message: `${await emoji("markNo")} Nic nie jest aktualnie odtwarzane.`,
                    color: ef.colors.red
                })
            } else if(id + 1 <= ef.queue[message.guild.id].queue.length) {
                var curr = ef.queue[message.guild.id].queue[id]
                ef.queue[message.guild.id].queue.splice(id, 1)
                ef.models.send({
                    object: message,
                    message: `${await emoji("markYes")} Pomyślnie pominięto utwór **${curr.title}**.`,
                })
            } else if (ef.queue[message.guild.id].queue.length == 0){
                ef.models.send({
                    object: message,
                    message: `${await emoji("markNo")} Nie ma żadnych utworów w kolejce. Użyj \`${ef.prefix}skip\`, aby pominąć aktualnie odtwarzany utwór.`,
                    color: ef.colors.red
                })
            } else if (!isNaN(args[0])) {
                ef.models.send({
                    object: message,
                    message: `${await emoji("markNo")} Podaj numer utworu znajdujący się w kolejce.`,
                    color: ef.colors.red
                })
            } else {
                ef.models.send({
                    object: message,
                    message: `${await emoji("markNo")} Podaj poprawny numer utworu.`,
                    color: ef.colors.red
                })
            }
        }
    }
}

exports.data = {
    triggers: ['skip'],
    description: 'Pomija utwór.',
    usage: [
        '{prefix}{command}',
        '{prefix}{command} <numer utworu w kolejce>'
    ]
}
