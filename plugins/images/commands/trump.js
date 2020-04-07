exports.output = async ({message, args}) => {
    ef.models.apibadosz({
        object: message,
        endpoint: `trump?text=${encodeURIComponent(args.slice(0).join(' '))}`
    })
}
  
exports.data = {
    triggers: ['trump'],
    description: {
        pl: 'Generuje tweet trumpa.',
        en: 'Generates Trump\'s tweet.',
        ru: 'Создает твит Трампа.'
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
    args: [
    {
        type:'text',
        name:'text'
    }]
}
  