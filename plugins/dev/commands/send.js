exports.output = async ({message, guild, args}) => {
    async function emoji(emojiname) { return await ef.utils.emoji.get(emojiname, message) }
    var channel = ef.channels.get(args[0])
    if(channel === undefined) {
        return ef.models.send({
            object: message,
            message: `${await emoji('markNo')}Niepoprawne ID kanału.`
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
            message: `${await emoji('markNo')}Nie można wysłać wiadomości.`
        })
        error = e
        require('../../../handlers/error')(message, e, true)
    })
  
    if(error === undefined){
        ef.models.send({
        object: message,
        message: `${await emoji('markYes')}Pomyślnie wysłano wiadomość.`
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