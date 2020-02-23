exports.output = async ({message, guild, args}) => {
    var Message = message
    await message.delete()
    if(args[0] <= 100 && args[0] > 0){
        var fetched = await Message.channel.fetchMessages({limit: args[0]}, true)
        fetched = fetched.array()

        try{
            await Message.channel.bulkDelete(fetched)
            .then(messages => {
                if(args[1] != '-nolog'){
                    if(messages.array().length > 0) {
                        ef.models.send({
                            object: Message,
                            message: `**Pomyślnie usunięto ${messages.array().length} wiadomoś${messages.array().length == 1 ? 'ć' : 'ci'}!**`
                        })
                    } else {
                        ef.models.send({
                            object: Message,
                            message: `**Nie można usunąć tych wiadomości!**`,
                            color: ef.colors.red
                        })
                    }
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
    description: 'Usuwa określoną ilość wiadomości (od 1 do 100). Wiadomości muszą być maksymalnie sprzed 2 tygodni.',
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
  