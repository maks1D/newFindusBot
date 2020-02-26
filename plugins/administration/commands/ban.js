exports.output = async ({message, guild, args}) => {
    var mention = message.mentions.members.first()
    if(!mention.bannable){
        return ef.models.send({
            object: message,
            message: `${ef.emotes.markNo} Nie mogę zbanować **${mention.user.tag}**!`,
            color: ef.colors.red
        })
    }
    mention.ban()
    .catch(async (err) => {
        return ef.models.send({
            object: message,
            message: `${ef.emotes.markNo} \`Nie mogę zbanować tego użytkownika!\``,
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
        title: `${ef.emotes.markYes} **Użytkownik: \`${mention.user.tag}\` pomyślnie zbanowany!**`,
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
  