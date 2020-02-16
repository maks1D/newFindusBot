exports.output = async ({message, guild, args}) => {
    var Message = message
    message.delete()
    if(args[0] <= 100 && args[0] > 0){
        var fetched = await Message.channel.fetchMessages({limit: args[0]})
        fetched = fetched.array()

        try{
            await Message.channel.bulkDelete(fetched)
            .then(messages => {
                if(args[1] != '-nolog'){
                    ef.models.send({
                        object: Message,
                        message: `**Pomyślnie usunięto ${messages.array().length} wiadomości!**`
                    })
                }
            })
        }catch(e){
            ef.models.send({
                object: Message,
                message: `**Nie można usunąć tych wiadomości!**`,
                color: ef.colors.red
            })
        }
    }else{
        ef.models.send({
            object: Message,
            message: `**Liczba wiadomości musi być pomiędzy 1 a 100!**`,
            color: ef.colors.red
        })
    }
}

exports.data = {
    triggers: ['purge', 'p'],
    description: 'Usuwa określoną ilość wiadomości (od 1 do 100).',
    usage: [
        '{prefix}{command} <ilość wiadomości do usunięcia> [-nolog]'
    ],
    args: [
        {
            type: 'number',
            name: 'Ilość wiadomości do usunięcia'
        }
    ],
    botPerms: [
        "MANAGE_MESSAGES"
    ],
    userPerms: [
        "MANAGE_MESSAGES"
    ]
}
  