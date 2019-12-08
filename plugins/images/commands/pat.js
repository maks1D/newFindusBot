exports.output = async ({message, guild, args}) => {
    var user = await ef.utils.users.search(message, args[0])
    ef.models.apibadosz({
        object: message,
        title: `${message.author.username} poklepał ${user.username}`,
        endpoint: `pat`
    })
}

exports.data = {
    triggers: ['pat'],
    description: 'Klepie kogoś.',
    usage: [
        '{prefix}{command} [wzmianka]',
        '{prefix}{command} [ID]',
        '{prefix}{command} [nazwa użytkownika]'     
    ]
}
  