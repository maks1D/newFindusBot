exports.output = async ({message, args}) => {
    const user = await ef.utils.users.search(message, args[0])
    ef.models.apibadosz({
        object: message,
        title: ':gun:',
        endpoint: `wanted?url=${user.displayAvatarURL}`
    })
}
  
exports.data = {
    triggers: ['wanted'],
    description: 'Generuje zdjęcie poszukiwanego.',
    usage: [
        '{prefix}{command} [wzmianka]',
        '{prefix}{command} [ID]',
        '{prefix}{command} [nazwa użytkownika]'
    ]
}
  