exports.output = async ({message, args}) => {
    const user = await ef.utils.users.search(message, args[0])
    var url = user.avatar == null ? 'https://cdn.discordapp.com/embed/avatars/0.png' : user.displayAvatarURL
    ef.models.apibadosz({
        object: message,
        title: ':angry:',
        endpoint: `triggered?url=${url}`
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
  