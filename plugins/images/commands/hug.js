exports.output = async ({message, guild, args}) => {
    var translations = {en: [], pl: [], ru: []}

    var user = await ef.utils.users.search(message, args[0])
    translations.pl[0] = `${message.author.username} przytulił ${user.username}!`
    translations.en[0] = `${message.author.username} has hugged ${user.username}!`
    translations.ru[0] = `${message.author.username} обнял ${user.username}!`
    ef.models.apibadosz({
        object: message,
        title: `${translations[guild.settings.language][0]}`,
        endpoint: `hug`
    })
}
  
exports.data = {
    triggers: ['hug'],
    description: {
        pl: 'Przytula kogoś.',
        en: 'Hugs someone.',
        ru: 'Обнимает кого-то.'
    },
    usage: {
        pl: [
            '{prefix}{command} [wzmianka]',
            '{prefix}{command} [ID]',
            '{prefix}{command} [nazwa użytkownika]'
        ],
        en: [
            '{prefix}{command} [mention]',
            '{prefix}{command} [id]',
            '{prefix}{command} [name]'
        ],
        ru: [
            '{prefix}{command} [упоминание]',
            '{prefix}{command} [ID]',
            '{prefix}{command} [имя пользователя]'
        ]
    }
}
