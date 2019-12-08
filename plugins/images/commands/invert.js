exports.output = async ({message, args}) => {
    const user = await ef.utils.users.search(message, args[0])
    ef.models.apibadosz({
        object: message,
        title: ':black_joker:',
        endpoint: `invert?url=${user.displayAvatarURL}`
    })
}
  
exports.data = {
    triggers: ['invert'],
    description: 'Generuje negatyw zdjęcia.',
    usage: [
        '{prefix}{command} [wzmianka]',
        '{prefix}{command} [ID]',
        '{prefix}{command} [nazwa użytkownika]'
    ]
}
  