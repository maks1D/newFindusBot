exports.output = async ({message, args}) => {
    const user = await ef.utils.users.search(message, args[0])
    var url = user.avatar == null ? `https://cdn.discordapp.com/embed/avatars/${user.discriminator % 5}.png` : user.displayAvatarURL
    ef.models.apibadosz({
        object: message,
        title: ':gun:',
        endpoint: `wasted?url=${url}`
    })
}
  
exports.data = {
    triggers: ['wasted'],
    description: 'Generuje zdjęcie wasted z GTA.',
    usage: [
        '{prefix}{command} [wzmianka]',
        '{prefix}{command} [ID]',
        '{prefix}{command} [nazwa użytkownika]'
    ]
}
  