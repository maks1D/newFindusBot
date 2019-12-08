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
        if(!args[0]) {
            ef.models.send({
                object: message,
                message: `${await emoji("markNo")} Podaj nową głośność.`,
                color: ef.colors.red
            })
            return
        }
        var state = await ef.player.volume(message, args)
        if(state == true) {
            ef.models.send({
                object: message,
                message: `${await emoji("markYes")} Pomyślnie ustawiono nową głośność na **${parseInt(args[0])}%**.`,
            })
        } else {
            ef.models.send({
                object: message,
                message: `${await emoji("markNo")} Nie udało się zmienić głośności.`,
                color: ef.colors.red
            })
        }
    }
}

exports.data = {
    triggers: ['volume', 'vol'],
    description: 'Ustawia głośność odtwarzania filmu na kanale głosowym. Od 0 do 1000. Domyśnie 100.',
    usage: [
        '{prefix}{command} <głośność>',
        '{prefix}{command} earrape'
    ]
}
