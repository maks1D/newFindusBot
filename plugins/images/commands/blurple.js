exports.output = async ({message, args}) => {
    const user = await ef.utils.users.search(message, args[0])
    var url = user.avatar == null ? `https://cdn.discordapp.com/embed/avatars/${user.discriminator % 5}.png` : user.displayAvatarURL
    ef.models.apibadosz({
        object: message,
        title: ':blue_heart:',
        endpoint: `blurple?url=${url}`
    })
}
  
exports.data = {
    triggers: ['blurple'],
    description: {
        pl: 'Generuje zblurplowany awatar.',
        en: 'Generates blurple avatar image.',
        ru: 'Создает пурпурно-синее изображение аватара.'
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
  