exports.output = async ({message, args}) => {
    const user = await ef.utils.users.search(message, args[0])
    ef.models.apibadosz({
        object: message,
        title: `${message.author.username} przytulił ${user.username}!`,
        endpoint: `hug`
    })
}
  
exports.data = {
    triggers: ['hug'],
    description: 'Przytula kogoś.',
    usage: [
        '{prefix}{command} [wzmianka]',
        '{prefix}{command} [ID]',
        '{prefix}{command} [nazwa użytkownika]'
    ]
}
