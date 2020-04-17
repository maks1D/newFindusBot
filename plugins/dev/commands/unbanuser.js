exports.output = async ({message, guild, args}) => {
    if(args[0] === undefined) {
        return ef.models.send({
            object: message,
            message: `${ef.emotes.markNo} Podaj poprawne ID użytkownika!`,
            color: ef.colors.red
        })
    }
    if(ef.userbans.includes(args[0])) {
        for(var i = 0; i < ef.userbans.length; i++) {
            if(ef.userbans[i] == args[0]) {
                ef.userbans.splice(i, 1);
            }
        }
        return ef.models.send({
            object: message,
            message: `${ef.emotes.markYes} Pomyślnie odbanowano użytkownika!`
        })
    }
    return ef.models.send({
        object: message,
        message: `${ef.emotes.markNo} Użytkownik nie został zbanowany!`
    })
}

exports.data = {
    triggers: ['unbanuser', 'ubuser'],
    description: 'Przywraca możliwość korzystania z komend użytkownikowi.',
    usage: [
        '{prefix}{command} <ID użytkownika>'
    ],
    developer: true
}