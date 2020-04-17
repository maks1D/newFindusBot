exports.output = async ({message, guild, args}) => {
    if(isNaN(args[0])) {
        return ef.models.send({
            object: message,
            message: `${ef.emotes.markNo}Podaj poprawną liczbę.`,
            color: ef.colors.red
        })
    }
    if(isNaN(args[1])) {
        return ef.models.send({
            object: message,
            message: `${ef.emotes.markNo}Podaj poprawną liczbę.`,
            color: ef.colors.red
        })
    }
    var a = parseInt(args[0])
    var b = parseInt(args[1])
    if(a > b) {
        var tmp = b
        b = a
        a = tmp
    }
    if(a < 0) {
        return ef.models.send({
            object: message,
            message: `${ef.emotes.markNo}Obsługa liczb ujemnych zostanie dodana w przyszłości.`,
            color: ef.colors.red
        })
    }
    if(b < 0) {
        return ef.models.send({
            object: message,
            message: `${ef.emotes.markNo}Obsługa liczb ujemnych zostanie dodana w przyszłości.`,
            color: ef.colors.red
        })
    }
    var rng = await ef.utils.number.random(a, b)
    ef.models.send({
        object: message,
        message: `**Oto liczba którą wylosowałeś:** \`${rng}\``
    })
}

exports.data = {
    triggers: ['rng'],
    description: 'Generuje losową liczbę z przedziału od min do max.',
    usage: [
        '{prefix}{command} <min> <max>'
    ]
}