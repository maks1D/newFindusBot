exports.output = async ({message, guild, args}) => {
    async function emoji(emojiname) { return await ef.utils.emoji.get(emojiname, message) }
    if(args[0] == 'pl'){
        ef.db.editDoc({id: guild.id}, {"settings.language": `pl`}, 'servers')
        ef.models.send({
            object: message,
            message: `${await emoji("markYes")}Język serwera został zmieniony na Polski!`,
        })
    }else if(args[0] == 'ru'){
        ef.db.editDoc({id: guild.id}, {"settings.language": `ru`}, 'servers')
        ef.models.send({
            object: message,
            message: `${await emoji("markYes")}Язык сервера был изменен на русский!`,
        })
    }else if(args[0] == 'en'){
        ef.db.editDoc({id: guild.id}, {"settings.language": `en`}, 'servers')
        ef.models.send({
            object: message,
            message: `${await emoji("markYes")}Server language has been changed to English!`,
        })
    }else if(args[0]){
        ef.models.send({
            object: message,
            message: `${await emoji("markNo")}Wybrany język nie jest obsługiwany (lub nie istnieje)!`,
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
    triggers: ['language'],
    description: 'Zmienia język na serwerze.',
    usage: [
        '{prefix}{command} [pl/en/ru]'     
    ],
    userPerms: [
        "MANAGE_GUILD"
    ]
}
  