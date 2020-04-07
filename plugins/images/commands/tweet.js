exports.output = async ({message, guild, args}) => {
    ef.models.apibadosz({
        object: message,
        endpoint: `tweet?text=${encodeURIComponent(args.join(' '))}&username=${encodeURIComponent(message.author.username)}&url=${encodeURIComponent(message.author.displayAvatarURL)}`
    })
}

exports.data = {
    triggers: ['tweet'],
    description: {
        pl: 'Generuje tweet.',
        en: 'Generates tweet.',
        ru: 'Создает твит.'
    },
    usage: {
        pl: [
            '{prefix}{command} <text>',
        ],
        en: [
            '{prefix}{command} <text>',
        ],
        ru: [
            '{prefix}{command} <текст>'
        ]
    },
    disabled: true
}
  
