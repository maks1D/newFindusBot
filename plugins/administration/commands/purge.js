exports.output = async ({message, guild, args}) => {
    var translations = {en: [], pl: [], ru: []}
    var Message = message
    await message.delete()
    if(args[0] <= 100 && args[0] > 0){
        var fetched = await Message.channel.fetchMessages({limit: Math.floor(parseInt(args[0]))}, true)
        fetched = fetched.array()

        translations.pl[1] = `${ef.emotes.markNo}**Nie można usunąć tych wiadomości!**`
        translations.en[1] = `${ef.emotes.markNo}**You cannot delete these messages!**`
        translations.ru[1] = `${ef.emotes.markNo}**Вы не можете удалить эти сообщения!**`

        try{
            await Message.channel.bulkDelete(fetched)
            .then(messages => {
                if(args[1] != '-nolog'){
                    if(messages.array().length > 0) {
                        translations.pl[0] = `${ef.emotes.markYes}**Pomyślnie usunięto ${messages.array().length} wiadomoś${messages.array().length == 1 ? 'ć' : 'ci'}!**`
                        translations.en[0] = `${ef.emotes.markYes}**Succesfully deleted ${messages.array().length} message${messages.array().length == 1 ? '' : 's'}!**`
                        translations.ru[0] = `${ef.emotes.markYes}**Успешно удален ${messages.array().length} пост${messages.array().length == 1 ? '' : 'а'}!**`
                        ef.models.send({
                            object: Message,
                            message: translations[guild.settings.language][0]
                        })
                    } else {
                        ef.models.send({
                            object: Message,
                            message: `${translations[guild.settings.language][1]}`,
                            color: ef.colors.red
                        })
                    }
                }
            })
        }catch(e){
            ef.models.send({
                object: Message,
                message: `${translations[guild.settings.language][1]}`,
                color: ef.colors.red
            })
        }
    }else{
        translations.pl[2] = `${ef.emotes.markNo}**Liczba wiadomości musi być pomiędzy 1 a 100!**`
        translations.en[2] = `${ef.emotes.markNo}**The number of messages must be between 1 and 100!**`
        translations.ru[2] = `${ef.emotes.markNo}**Количество сообщений должно быть от 1 до 100!**`
        ef.models.send({
            object: Message,
            message: `${translations[guild.settings.language][2]}`,
            color: ef.colors.red
        })
    }
}

exports.data = {
    triggers: ['purge', 'p'],
    description: {
        pl: 'Usuwa określoną liczba wiadomości (od 1 do 100). Wiadomości muszą być maksymalnie sprzed 2 tygodni.',
        en: 'Deletes the specified number of messages (from 1 to 100). Messages must be a maximum of 2 weeks ago.',
        ru: 'Удаляет указанное количество сообщений (от 1 до 100). Сообщения должны быть максимум 2 недели назад.'
    },
    usage: {
        pl: [
            '{prefix}{command} <liczba wiadomości do usunięcia> [-nolog]'
        ],
        en: [
            '{prefix}{command} <number of messages to delete> [-nolog]'
        ],
        ru: [
            '{prefix}{command} <Количество сообщений для удаления> [-nolog]'
        ]
    },
    args: {
        pl: [ 
            {
                type: 'number',
                name: 'Liczba wiadomości do usunięcia'
            }
        ],
        en: [
            {
                type: 'number',
                name: 'Number of messages to delete'
            }
        ],
        ru: [
            {
                type: 'number',
                name: 'Количество сообщений для удаления'
            }
        ]
    },
    botPerms: [
        "MANAGE_MESSAGES"
    ],
    userPerms: [
        "MANAGE_MESSAGES"
    ]
}
  