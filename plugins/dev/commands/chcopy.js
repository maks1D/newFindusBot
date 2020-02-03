var {Attachment} = require('discord.js')

exports.output = async ({message, guild, args}) => {
    async function emoji(emojiname) { return await ef.utils.emoji.get(emojiname, message) }

    if(ef.channels.get(args[0]) === undefined) return ef.models.send({
        object: message,
        color: ef.colors.red,
        message: `${await emoji('markNo')}Podaj poprawne ID kanału źródłowego!`
    })

    var messages = await ef.channels.get(args[0]).fetchMessages()

    messages = messages.array()

    if(ef.channels.get(args[1]) === undefined) return ef.models.send({
        object: message,
        color: ef.colors.red,
        message: `${await emoji('markNo')}Podaj poprawne ID kanału docelowego!`
    })

    var target = ef.channels.get(args[1])

    var i = messages.length - 1

    var showauthor = false

    if(args[2] == '-showauthor') {
        showauthor = true
    }
    
    function copy(i) {
        var file = messages[i].attachments.array()
        if(file.length != 0) {
            var attachment = new Attachment(`${file[0].url}`)
            target.send(`\u200B\n${showauthor ? `**Autor: ${messages[i].author.tag}**\n` : ''}${messages[i].content}`, attachment)
        } else {
            target.send(`\u200B\n${showauthor ? `**Autor: ${messages[i].author.tag}**\n` : ''}${messages[i].content}`)
        }

        if(i == 0) return
        setTimeout(copy, 1000, i - 1)
    }

    copy(i)

    ef.models.send({
        object: message,
        message: `${await emoji('markYes')}**Pomyślnie skopiowano kanał!**`
    })
}

exports.data = {
    triggers: ['chcopy'],
    description: 'Kopiuje kanał tekstowy.',
    usage: [
        '{prefix}{command} <ID kanału źródłowego> <ID kanału docelowego> [-showauthor]'
    ],
    developer: true
}