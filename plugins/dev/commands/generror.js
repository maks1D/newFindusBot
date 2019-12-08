exports.output = async ({message, guild, args}) => {
    async function emoji(emojiname) { return await ef.utils.emoji.get(emojiname, message) }

    message.delete(1000)

    throw `${args.join(' ')}`
}

exports.data = {
    triggers: ['generateerror'],
    description: 'Generuje błąd.',
    usage: [
        '{prefix}{command} <treść błędu>'
    ],
    developer: true
}