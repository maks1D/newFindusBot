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
        ef.queue[message.guild.id].queue = []
        ef.queue[message.guild.id].player.end()
        await message.guild.voiceConnection.disconnect()
        delete ef.queue[message.guild.id]
        ef.models.send({
            object: message,
            message: `${await emoji("markYes")} Pomyślnie opuszczono kanał głosowy.`,
        })
    }
}

exports.data = {
    triggers: ['leave'],
    description: 'Sprawia, że bot opuszcza kanał. (Bot automatycznie opuszcza kanał po 10s od opuszczenia kanału przez ostatniego użytkownika.',
    usage: [
        '{prefix}{command}'
    ]
}
