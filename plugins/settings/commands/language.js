exports.output = async ({message, guild, args}) => {
    var translations = {en: [], pl: [], ru: []}

    if(args[0] == 'pl'){
        ef.db.editDoc({id: guild.id}, {"settings.language": `pl`}, 'servers')
        ef.models.send({
            object: message,
            message: `${ef.emotes.markYes}Język serwera został zmieniony na Polski!`,
        })
    }else if(args[0] == 'ru'){
        ef.db.editDoc({id: guild.id}, {"settings.language": `ru`}, 'servers')
        ef.models.send({
            object: message,
            message: `${ef.emotes.markYes}Язык сервера был изменен на русский!`,
        })
    }else if(args[0] == 'en'){
        ef.db.editDoc({id: guild.id}, {"settings.language": `en`}, 'servers')
        ef.models.send({
            object: message,
            message: `${ef.emotes.markYes}Server language has been changed to English!`,
        })
    }else if(args[0]){
        translations.pl[0] = `${ef.emotes.markNo}Wybrany język nie jest obsługiwany (lub nie istnieje)!`
        translations.en[0] = `${ef.emotes.markNo}The selected language is not supported (or does not exist)!`
        translations.ru[0] = `${ef.emotes.markNo}Выбранный язык не поддерживается (или не существует)!`
        ef.models.send({
            object: message,
            message: `${translations[guild.settings.language][0]}`,
            color: ef.colors.red
        })
    }else{
        if(guild.settings.language == 'en'){
            ef.models.send({
                object: message,
                message: `Server language is English!`,
            })
        }else if(guild.settings.language == 'pl'){
            ef.models.send({
                object: message,
                message: `Język serwerowy to Polski!`,
            })
        }else if(guild.settings.language == 'ru'){
            ef.models.send({
                object: message,
                message: `Язык сервера русский!`,
            })
        }
    }
}

exports.data = {
    triggers: ['language', 'lang'],
    description: {
        pl: 'Zmienia język na serwerze.',
        en: 'Chaneges server language.',
        ru: 'Меняет язык сервера.'
    },
    usage: [
        '{prefix}{command} [pl/en/ru]'     
    ],
    userPerms: [
        "MANAGE_GUILD"
    ]
}