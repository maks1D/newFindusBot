exports.output = async ({message, guild, args}) => {
    var mention = message.mentions.members.first()
    if(!mention.kickable){
        return ef.models.send({
            object: message,
            message: `${ef.emotes.markNo} Nie mogę zkickować ${mention.user.tag}!`,
            color: ef.colors.red
        })
    }
    mention.kick()
    .catch(async (err) => {
        return ef.models.send({
            object: message,
            message: `${ef.emotes.markNo} \`Nie mogę zkickować tego użytkownika!\``,
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
        title: `${ef.emotes.markYes} **Użytkownik: \`${mention.user.tag}\` pomyślnie zkickowany!**`,
        message: `${reason !== undefined ? `**Powód:** \`${reason}\`` : ''}`
    })
}

exports.data = {
    triggers: ['kick', 'k'],
    description: 'Wyrzuca członków z serwera.',
    usage: [
        '{prefix}{command} [wzmianka] <powód (opcjonalnie)>'
    ],
    userPerms: [
        "KICK_MEMBERS"
    ],
    botPerms: [
        'KICK_MEMBERS'
    ],
    args: [
        {
            type: 'mention',
            name: 'Wzmianka użytkownika, który ma zostać zkickowany'
        }
    ]
}
  