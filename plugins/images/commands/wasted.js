exports.output = async ({message, args}) => {
    const user = await ef.utils.users.search(message, args[0])
    ef.models.apibadosz({
        object: message,
        title: ':gun:',
        endpoint: `wasted?url=${user.displayAvatarURL}`
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
  