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

    if(!args[0]) {
        ef.models.send({
            object: message,
            message: `${ef.emotes.markNo} Podaj nową głośność.`,
            color: ef.colors.red
        })
        return
    }
    if(args[0] !== 'earrape' && isNaN(args[0])) {
        ef.models.send({
            object: message,
            message: `${ef.emotes.markNo} Podaj poprawną głośność.`,
            color: ef.colors.red
        })
        return
    }
    var state = await ef.player.volume(message, args)
    if(state == true) {
        ef.models.send({
            object: message,
            message: `${ef.emotes.markYes} Pomyślnie ustawiono nową głośność na **${ef.queue[message.guild.id].volume}%**.`,
        })
    } else {
        ef.models.send({
            object: message,
            message: `${ef.emotes.markNo} Nie udało się zmienić głośności.`,
            color: ef.colors.red
        })
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
