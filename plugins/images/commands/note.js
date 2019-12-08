exports.output = async ({message, args}) => {
    ef.models.apibadosz({
        object: message,
        endpoint: `note?text=${encodeURIComponent(args.slice(0).join(' '))}`
    })
}
  
exports.data = {
    triggers: ['note'],
    description: 'Generuje notatkę.',
    usage: [
        '{prefix}{command} <tekst>',
    ],
    args: [
    {
        type:'text',
        name:'text'
    }]
}
  