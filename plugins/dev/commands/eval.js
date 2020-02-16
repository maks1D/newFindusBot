exports.output = async ({message, guild, args}) => {
    async function emoji(emojiname) { return await ef.utils.emoji.get(emojiname, message) }

    try
    {
        var before = Date.now()
        var output = eval(args.join(' '))
        var duration = Date.now() - before
        ef.models.send({
            object: message,
            title: `**Eval output:**`,
            message: `\`\`\`js\n${output}\`\`\``,
            footer: duration
        })
    } catch(e) {
        ef.models.send({
            object: message,
            title: `**Error:**`,
            message: `\`\`\`js\n${e}\`\`\``,
            color: ef.colors.red
        })
    }
}

exports.data = {
    triggers: ['eval'],
    description: 'Wykonuje komendę podaną jako argument.',
    usage: [
        '{prefix}{command} <command>'
    ],
    developer: true
}