exports.output = async ({message, args}) => {
    ef.models.apibadosz({
        object: message,
        endpoint: `note?text=${encodeURIComponent(args.slice(0).join(' '))}`
    })
}
  
exports.data = {
    triggers: ['note'],
    description: {
        pl: 'Generuje notatkę.',
        en: 'Generates note image.',
        ru: 'Создает заметку.'
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
    }], 
    disabled: true
}
  
