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
        var state = await ef.player.resume(message)
        if(state == true) {
            ef.models.send({
                object: message,
                message: `${await emoji("markYes")} Pomyślnie wznowiono odtwarzanie filmu.`,
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
    triggers: ['resume'],
    description: 'Wznawia muzykę na kanale.',
    usage: [
        '{prefix}{command}'
    ]
}
