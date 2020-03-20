exports.output = async ({message, guild, args}) => {
    var translations = {en: [], pl: [], ru: []}
    var mention = message.mentions.members.first()
    if(!mention.bannable){
        translations.pl[0] = `${ef.emotes.markNo} Nie mogę zbanować **${mention.user.tag}**!`
        translations.en[0] = `${ef.emotes.markNo} I cannot ban **${mention.user.tag}**!`
        translations.ru[0] = `${ef.emotes.markNo} Я не могу забанить **${mention.user.tag}**!`
        return ef.models.send({
            object: message,
            message: `${translations[guild.settings.language][0]}`,
            color: ef.colors.red
        })
    }
    args.shift()
    var reason
    if(args[0]){
        reason = args.join(' ')
    }
    mention.ban(reason)
    .catch(async (err) => {
        translations.pl[1] = `${ef.emotes.markNo} \`Nie mogę zbanować tego użytkownika!\``
        translations.en[1] = `${ef.emotes.markNo} \`I cannot ban this user!\``
        translations.ru[1] = `${ef.emotes.markNo} \`Я не могу забанить этого пользователя!\``
        return ef.models.send({
            object: message,
            message: `${translations[guild.settings.language][1]}`,
            color: ef.colors.red
        })
    })
    translations.pl[2] = `${ef.emotes.markYes} **Użytkownik: \`${mention.user.tag}\` pomyślnie zbanowany!**`
    translations.en[2] = `${ef.emotes.markYes} **User: \`${mention.user.tag}\` successfully banned!**`
    translations.ru[2] = `${ef.emotes.markYes} **пользователь: \`${mention.user.tag}\` успешно забанен!**`
    translations.pl[3] = `${reason !== undefined ? `**Powód:** \`${reason}\`` : ''}`
    translations.en[3] = `${reason !== undefined ? `**Reason:** \`${reason}\`` : ''}`
    translations.ru[3] = `${reason !== undefined ? `**причина:** \`${reason}\`` : ''}`
    ef.models.send({
        object: message,
        author: [mention.user.tag, mention.user.displayAvatarURL],
        title: `${translations[guild.settings.language][2]}`,
        message: `${translations[guild.settings.language][3]}`
    })
}

exports.data = {
    triggers: ['ban', 'b'],
    description: {
        pl: 'Banuje członków serwera.',
        en: 'Ban the server members.',
        ru: 'Забанить участников сервера.'
    },
    usage: {
        pl: [
            '{prefix}{command} [wzmianka] <powód (opcjonalnie)>'
        ],
        en: [
            '{prefix}{command} [mention] <reason (optional)>'
        ],
        ru: [
            '{prefix}{command} [упоминание] <причина (необязательный)>'
        ]
    },
    userPerms: [
        "BAN_MEMBERS"
    ],
    botPerms: [
        'BAN_MEMBERS'
    ],
    args: {
        pl: [
            {
                type: 'mention',
                name: 'Wzmianka użytkownika, który ma zostać zbanowany'
            }
        ],
        en: [
            {
                type: 'mention',
                name: 'Mention of the user to be banned'
            }
        ],
        ru: [
            {
                type: 'mention',
                name: 'Упоминание о том, что пользователя забанят'
            }
        ]
    }
    
    
}
  