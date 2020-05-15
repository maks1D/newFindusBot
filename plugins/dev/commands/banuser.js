exports.output = async ({message, guild, args}) => {
    if(args[0] === undefined) {
        return ef.models.send({
            object: message,
            message: `${ef.emotes.markNo} Podaj poprawne ID użytkownika!`,
            color: ef.colors.red
        })
    }
    if(!ef.userbans.includes(args[0])) {
        ef.userbans.push(args[0])
        return ef.models.send({
            object: message,
            message: `${ef.emotes.markYes} Pomyślnie zbanowano użytkownika!`
        })
    }
    return ef.models.send({
        object: message,
        message: `${ef.emotes.markNo} Użytkownik jest już zbanowany!`,
        color: ef.colors.red
    })
}

exports.data = {
    triggers: ['banuser', 'buser'],
    description: 'Banuje możliwość korzystania z komend dla użytkownika.',
    usage: [
        '{prefix}{command} <ID użytkownika>'
    ],
    developer: true
}