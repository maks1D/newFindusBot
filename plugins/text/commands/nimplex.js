exports.output = async ({message}) => {
    if (!message.channel.nsfw) {
        ef.models.send({
            object: message,
            message: `${ef.emotes.markNo} Due to the vulgar nature of this command, it is limited to NSFW channels only.`,
            color: ef.colors.red
        })
    } else {
        ef.models.apiaf4({
            object: message,
            endpoint: 'nimplex',
            type: 'text',
            output: 'text'
        })
    }
}
exports.data = {
    triggers: ['nimplex', 'nimpleks', 'nimblegz', 'debil'],
    description: {
        pl: 'Pokazuje losowy tekst o nimblegzie. [NSFW]',
        en: 'Shows random text about nimblegz. [NSFW]',
        ru: 'Показывает случайный текст о нимблегзе. [NSFW]'
    }
}
