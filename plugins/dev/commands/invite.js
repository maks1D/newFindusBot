exports.output = async ({message, guild, args}) => {
    async function emoji(emojiname) { return await ef.utils.emoji.get(emojiname, message) }
    var found = false
    if(ef.guilds.get(args[0]).available == false) return ef.models.send({
        object: message,
        color: ef.colors.red,
        message: `${await emoji('markNo')}Ten serwer jest niedostępny.`
    })
    await ef.guilds.get(args[0]).fetchInvites()
    .then(async invites => {
        if(invites.size > 0) {
            var array = invites.array()
            for(var i = 0; i < invites.size; i++) {
                if(array[i].temporary == false) {
                    found = true
                    ef.models.send({
                        object: message,
                        message: `${await emoji('markYes')}Pomyślnie utworzono zaproszenie: **https://discord.gg/${array[i].code}**.`
                    })
                    break
                }
            }
        }
    })
    if(found == true) return
    var channel = 'null';
    var channels = ef.guilds.get(args[0]).channels.array()
    for(var i = 0; i < channels.length; i++) {
        if(channels[i].type == 'text') channel = channels[i].id
    }
    if(channel == 'null') return ef.models.send({
                                    object: message,
                                    color: ef.colors.red,
                                    message: `${await emoji('markNo')}Nie da się utworzyć zaproszenia na ten serwer.`
                                })
    var invite = await ef.channels.get(channel).createInvite({maxUses: 5, maxAge: 3600})

    ef.models.send({
        object: message,
        message: `${await emoji('markYes')}Pomyślnie utworzono zaproszenie: **https://discord.gg/${invite.code}**.`
    })
}

exports.data = {
    triggers: ['serverinvite'],
    description: 'Tworzy zaproszenie na serwer.',
    usage: [
        '{prefix}{command} <id serwera>'
    ],
    args: [
    {
        type: 'id',
        name: 'id serwera'
    }
    ],
    developer: true
}