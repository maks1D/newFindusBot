exports.output = async ({message, guild, args}) => {
    var translations = {en: [], pl: [], ru: []}
    if(isNaN(args[0]) || isNaN(args[1])) {
        translations.pl[0] = `${ef.emotes.markNo}Podaj poprawną liczbę.`
        translations.en[0] = `${ef.emotes.markNo}Please enter a valid number.`
        translations.ru[0] = `${ef.emotes.markNo}Пожалуйста, введите правильный номер.`
        return ef.models.send({
            object: message,
            message: `${translations[guild.settings.language][0]}`,
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
 
    var rng = await ef.utils.number.random(a, b)
    translations.pl[1] = `**Oto liczba którą wylosowałeś:** \`${rng}\``
    translations.en[1] = `**Here is the number you have drawn:** \`${rng}\``
    translations.ru[1] = `**Вот номер, который вы нарисовали:** \`${rng}\``
    ef.models.send({
        object: message,
        message: `${translations[guild.settings.language][1]}`
    })
}

exports.data = {
    triggers: ['rng'],
    description: {
        pl: 'Generuje losową liczbę z przedziału od min do max.',
        en: 'Generates a random number between min and max.',
        ru: 'Генерирует случайное число от мин до макс.'
    },
    usage: {
        pl: [
            '{prefix}{command} <min> <max>'
        ],
        en: [
            '{prefix}{command} <min> <max>'
        ],
        ru: [
            '{prefix}{command} <мин> <макс>'
        ]
    }
}
