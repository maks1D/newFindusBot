exports.output = async ({message, args}) => {
    const user = await ef.utils.users.search(message, args[0])
    ef.models.apibadosz({
        object: message,
        title: ':angry:',
        endpoint: `triggered?url=${user.displayAvatarURL}`
    })
}
  
exports.data = {
    triggers: ['triggered'],
    description: 'Generates triggered image.',
    usage: [
        '{prefix}{command} [wzmianka]',
        '{prefix}{command} [ID]',
        '{prefix}{command} [nazwa użytkownika]'
    ]
}
  