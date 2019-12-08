exports.output = async ({message, args}) => {
    const user = await ef.utils.users.search(message, args[0])
    ef.models.apibadosz({
        object: message,
        title: ':blue_heart:',
        endpoint: `blurple?url=${user.displayAvatarURL}`
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
  