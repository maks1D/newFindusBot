exports.output = async ({message, args}) => {
    ef.models.apibadosz({
        object: message,
        endpoint: `changemymind?text=${encodeURIComponent(args.slice(0).join(' '))}`
    })
}
  
exports.data = {
    triggers: ['changemymind','cmm'],
    description: {
        pl: 'Generuje zdjęcie change my mind.',
        en: 'Generates change my mind image.',
        ru: 'Создает изображение «передумай».'
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
  