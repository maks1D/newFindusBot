exports.output = async ({message, args}) => {
    ef.models.apibadosz({
        object: message,
        endpoint: `trump?text=${encodeURIComponent(args.slice(0).join(' '))}`
    })
}
  
exports.data = {
    triggers: ['trump'],
    description: 'Generuje tweet trumpa.',
    usage: [
        '{prefix}{command} <tekst>',
    ],
    args: [
    {
        type:'text',
        name:'text'
    }]
}
  