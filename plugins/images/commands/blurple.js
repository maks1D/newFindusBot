exports.output = async ({message, args}) => {
    const user = await ef.utils.users.search(message, args[0])
    var url = user.avatar == null ? 'https://cdn.discordapp.com/embed/avatars/0.png' : user.displayAvatarURL
    ef.models.apibadosz({
        object: message,
        title: ':blue_heart:',
        endpoint: `blurple?url=${url}`
    })
}
  
exports.data = {
    triggers: ['blurple'],
    description: 'Generuje zblurplowaną wersję twojego lub wybranej osoby awatara.',
    usage: [
        '{prefix}{command} [wzmianka]',
        '{prefix}{command} [ID]',
        '{prefix}{command} [nazwa użytkownika]'
    ]
}
  