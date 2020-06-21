exports.output = async ({message, guild, args}) => {
    var translations = {en: [], pl: [], ru: []}

    if(args[0] && args[0].length >= 1 && args[0].length <= 100){
        translations.pl[0] = `${ef.emotes.markYes}Pomyślnie zmieniono prefix na: \`${args[0]}\``
        translations.en[0] = `${ef.emotes.markYes}Successfully changed the prefix to: \`${args[0]}\``
        translations.ru[0] = `${ef.emotes.markYes}Успешно изменили префикс на: \`${args[0]}\``
        ef.db.editDoc({id: guild.id}, {"settings.prefix": args[0]}, 'servers')
        return ef.models.send({
            object: message,
            message: `${translations[guild.settings.language][0]}`
        })
    } else if(args[0] && args[0].length < 100) {
        translations.pl[0] = `${ef.emotes.markNo}Twój prefix jest za długi.`
        translations.en[0] = `${ef.emotes.markNo}Your prefix is too long.`
        translations.ru[0] = `${ef.emotes.markNo}Ваш префикс слишком длинный.`
        ef.db.editDoc({id: guild.id}, {"settings.prefix": args[0]}, 'servers')
        return ef.models.send({
            object: message,
            message: `${translations[guild.settings.language][0]}`,
            color: ef.colors.red
        })
    }

    translations.pl[1] = `
Mój prefix na serwerze to: \`${guild.settings.prefix}\`\n
Aby go zmienić wpisz \`${ef.prefix}prefix [nowy prefix]\``
    translations.en[1] = `
My server prefix is: \`${guild.settings.prefix}\`\n
To change it, enter \`${ef.prefix}prefix [new prefix] \``
    translations.ru[1] = `
Мой префикс сервера: \`${guild.settings.prefix}\`\n
Чтобы изменить его, введите \`${ef.prefix}prefix [новый префикс]\``

    ef.models.send({
        object: message,
        message: `${translations[guild.settings.language][1]}`
    })
}

exports.data = {
    triggers: ['prefix'],
    description: {
        pl: 'Pokazuje lub modyfikuje prefix na serwerze. Maksymalna długość prefixu wynosi 100 znaków.',
        en: 'Shows or modifies the prefix on the server. The maximum prefix length is 100 characters.',
        ru: 'Показывает или изменяет префикс на сервере. Максимальная длина префикса составляет 100 символов.'
    },
    usage: {
        pl:[
            '{prefix}{command} [nowy prefix]'
        ],
        en: [
            '{prefix}{command} [new prefix]'
        ],
        ru: [
            '{prefix}{command} [новый префикс]'
        ]
    },
    userPerms: [
        "MANAGE_GUILD"
    ]
}
  