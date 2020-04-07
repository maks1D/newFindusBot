exports.output = async ({message, args}) => {
    ef.models.apibadosz({
        object: message,
        endpoint: `excuseme?text=${encodeURIComponent(args.slice(0).join(' '))}`
    })
}
  
exports.data = {
    triggers: ['excuseme'],
    description: {
        pl: 'Generuje mema excuse me.',
        en: 'Generates excuse me image.',
        ru: 'Создает изображение «извините».'
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
  