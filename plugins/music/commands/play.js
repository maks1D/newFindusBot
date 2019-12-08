exports.output = async ({message, guild, args}) => {
    async function emoji(emojiname) { return await ef.utils.emoji.get(emojiname, message) }

    if(!message.member.voiceChannel) {
        ef.models.send({
            object: message,
            message: `${await emoji("markNo")} Nie jesteś połączony z żadnym kanałem głosowym.`,
            color: ef.colors.red
        })
    } else {
        if(!args[0]) {
            ef.models.send({
                object: message,
                message: `${await emoji("markNo")} Podaj nazwę filmu / utworu do odtworzenia.`,
                color: ef.colors.red
            })
            return
        }
        if(args[0] == '--noleave') {
            if(ef.roles.developers.includes(message.author.id)) {
                if(ef.queue[message.guild.id]) {
                    ef.queue[message.guild.id].autoleave = false
                    ef.models.send({
                        object: message,
                        message: `${await emoji('markYes')} Wyłączono auto leave!`
                    })
                    return
                } else {
                    ef.models.send({
                        object: message,
                        message: `${await emoji("markNo")} Nie jestem aktualnie połączony z żadnym kanałem głosowym.`,
                        color: ef.colors.red
                    })
                    return
                }
            }
        }
        if(!message.guild.voiceConnection){

        }else if(message.guild.voiceConnection.channel.id != message.member.voiceChannel.id) {
            ef.models.send({
                object: message,
                message: `${await emoji("markNo")} Nie jestem obecnie połączony z tym kanałem głosowym.`,
                color: ef.colors.red
            })
            return
        }
        var song = await ef.player.search(args.join(' '))
        if(song == 'noVideo') {
            ef.models.send({
                object: message,
                message: `${await emoji("markNo")} Nie znaleziono filmu.`,
                color: ef.colors.red
            })
            return
        }
        if(!message.guild.voiceConnection){
            await message.member.voiceChannel.join()
        }
        if(ef.queue[message.guild.id]){
            ef.queue[message.guild.id].queue.push(song)
        } else {
            ef.queue[message.guild.id] = {
                player: '',
                nowPlaying: '',
                queue: [song],
                connection: message.guild.voiceConnection,
                volume: 100,
                autoleave: true
            }
        }
        ef.models.send({
            object: message,
            message: `${await emoji("markYes")} Pomyślnie dodano film **${song.title}** do kolejki.\n\nWideo z kanału: **${song.channel}**.`,
            thumbnail: song.imageURL,
            footer: `🔉 ${ef.queue[message.guild.id].volume}% • Requested by ${message.author.tag}`
        })
        ef.player.play(message)
    }
}

exports.data = {
    triggers: ['play'],
    description: 'Puszcza muzykę.',
    usage: [
        '{prefix}{command} <nazwa piosenki / filmu na YouTube / link do filmu na YouTube>'
    ]
}
  