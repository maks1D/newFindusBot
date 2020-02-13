exports.output = async ({message, guild, args}) => {
    return
    ef.models.apibadosz({
        object: message,
        endpoint: `tweet?text=${encodeURIComponent(args.join(' '))}&username=${encodeURIComponent(message.author.username)}&url=${encodeURIComponent(message.author.displayAvatarURL)}`
    })
}

exports.data = {
    triggers: ['tweet'],
    description: 'Generuje tweet.',
    usage: [
        '{prefix}{command} <treść tweeta>'     
    ], 
    hiddenInHelp: true
}
  
