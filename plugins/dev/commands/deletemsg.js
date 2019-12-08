exports.output = async ({message, guild, args}) => {

    var target = await message.channel.fetchMessage(`${args[0]}`)

    target.delete()

    message.delete()
}

exports.data = {
    triggers: ['deletemsg'],
    description: 'Usuwa wiadomość.',
    usage: [
        '{prefix}{command} <ID wiadomości>'
    ],
    developer: true
}