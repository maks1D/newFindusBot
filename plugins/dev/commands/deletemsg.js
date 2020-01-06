exports.output = async ({message, guild, args}) => {

    try {
        var target = await message.channel.fetchMessage(`${args[0]}`)

        target.delete()

        message.delete()
    } catch (error) {
        
    }
}

exports.data = {
    triggers: ['deletemsg'],
    description: 'Usuwa wiadomość.',
    usage: [
        '{prefix}{command} <ID wiadomości>'
    ],
    developer: true
}