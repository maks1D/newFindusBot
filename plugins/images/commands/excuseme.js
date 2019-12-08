exports.output = async ({message, args}) => {
    ef.models.apibadosz({
        object: message,
        endpoint: `excuseme?text=${encodeURIComponent(args.slice(0).join(' '))}`
    })
}
  
exports.data = {
    triggers: ['excuseme'],
    description: 'Generuje mema excuse me.',
    usage: [
        '{prefix}{command} <tekst>',
    ],
    args: [
    {
        type:'text',
        name:'text'
    }]
}
  