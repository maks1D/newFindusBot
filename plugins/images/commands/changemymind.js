exports.output = async ({message, args}) => {
    ef.models.apibadosz({
        object: message,
        endpoint: `changemymind?text=${encodeURIComponent(args.slice(0).join(' '))}`
    })
}
  
exports.data = {
    triggers: ['changemymind','cmm'],
    description: 'Generuje zdjęcie change my mind.',
    usage: [
        '{prefix}{command} <text>',
    ],
    args: [
    {
        type:'text',
        name:'text'
    }]
}
  