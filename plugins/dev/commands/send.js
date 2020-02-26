exports.output = async ({message, guild, args}) => {
    var channel = ef.channels.get(args[0])
    if(channel === undefined) {
        return ef.models.send({
            object: message,
            message: `${ef.emotes.markNo}Niepoprawne ID kanału.`,
            color: ef.colors.red
        })
    }
    var id = args[0]

    args.shift()
    var msg = args.join(' ')
    var error

    await ef.models.send({
        channel: id,
        message: msg
    })
    .catch(async(e) => {ef.models.send({
            object: message,
            message: `${ef.emotes.markNo}Nie można wysłać wiadomości.`,
            color: ef.colors.red
        })
        error = e
        require('../../../handlers/error')(message, e, true)
    })
  
    if(error === undefined){
        ef.models.send({
            object: message,
            message: `${ef.emotes.markYes}Pomyślnie wysłano wiadomość.`
        })
        
        message.delete()
    }
}
  
exports.data = {
    triggers: ['send'],
    description: 'Wysyła wiadomość.',
    usage: [
        '{prefix}{command} <id kanału> <wiadomość>'
    ],
    args: [
        {
            type: 'id',
            name: 'id kanału'
        }
    ],
    developer: true
}