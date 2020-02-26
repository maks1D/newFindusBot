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
    
    var state = await ef.player.pause(message)
    if(state == true) {
        ef.models.send({
            object: message,
            message: `${ef.emotes.markYes} Pomyślnie zatrzymano odtwarzanie filmu.`,
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
    triggers: ['pause'],
    description: 'Zatrzymuje muzykę na kanale.',
    usage: [
        '{prefix}{command}'
    ]
}
