exports.output = async ({message, guild, args}) => {
    async function emoji(emojiname) { return await ef.utils.emoji.get(emojiname, message) }

    var mention = message.mentions.members.first()
    if(!mention.bannable){
        return ef.models.send({
            object: message,
            message: `${await emoji("markNo")} Nie mogę zbanować **${mention.user.tag}**!`,
            color: ef.colors.red
        })
    }
    mention.ban()
    .catch(async (err) => {
        return ef.models.send({
            object: message,
            message: `${await emoji("markNo")} \`Nie mogę zbanować tego użytkownika!\``,
            color: ef.colors.red
        })
    })
    args.shift()
    var reason
    if(args[0]){
        reason = args.join(' ')
    }
    ef.models.send({
        object: message,
        author: [mention.user.tag, mention.user.displayAvatarURL],
        title: `${await emoji("markYes")} **Użytkownik: \`${mention.user.tag}\` pomyślnie zbanowany!**`,
        message: `${reason !== undefined ? `**Powód:** \`${reason}\`` : ''}`
    })
}

exports.data = {
    triggers: ['ban', 'b'],
    description: 'Banuje członków serwera.',
    usage: [
        '{prefix}{command} [wzmianka] <powód (opcjonalnie)>'
    ],
    userPerms: [
        "BAN_MEMBERS"
    ],
    botPerms: [
        'BAN_MEMBERS'
    ],
    args: [
        {
            type: 'mention',
            name: 'Wzmianka użytkownika, który ma zostać zbanowany'
        }
    ]
}
  