exports.output = async ({message, args}) => {
    const emojis = ['🇦', '🇧', '🇨', '🇩', '🇪', '🇫', '🇬', '🇭', '🇮', '🇯', '🇰', '🇱', '🇲', '🇳', '🇴', '🇵', '🇶', '🇷', '🇸', '🇹']
    
    args = args.join(' ')

    if (!args.includes(",")) {
        const poll = await ef.models.send({
            object: message,
            message: `\`${args}\``,
            author: [`${message.author.tag} • Poll`, message.author.displayAvatarURL]
        })
        await poll.react(ef.emotes.markYesID)
        await poll.react(ef.emotes.markNoID)
        return message.delete(1000).catch(e => {})
    }

    args = args.split(",")

    if ((args.length - 1) > 20) {
        return ef.models.send({
            object: message,
            message: `${ef.emotes.markNo} You have provided too much options. Maximum amount is 20.`,
            color: ef.colors.red
        })
    }

    let text = `\`${args[0]}\`\n\n`
    for (let i = 0; i < args.length - 1; i++) {
        text += `${':regional_indicator_' + String.fromCharCode('a'.charCodeAt(0) + i) + ':'}\`${args[i + 1]}\`\n`
    }

    const poll = await ef.models.send({
        object: message,
        message: text,
        author: [`${message.author.tag} • Poll`, message.author.displayAvatarURL]
    })

    for (i = 0; i < args.length - 1; i++) {
        await poll.react(emojis[i])
    }


    message.delete(1000).catch(e => {})
  }
  
  exports.data = {
    triggers: ['poll', 'vote'],
    description: 'Creates poll. Max 20 options.',
    usage: [
        '{prefix}{command} <text>',
        '{prefix}{command} <text>, <option 1>, <option 2>, ...',
    ],
    args: [
        {
            'type': 'text',
            'name': 'text'
        }
    ],
    botPerms: [
        'ADD_REACTIONS',
        'READ_MESSAGE_HISTORY',
        'USE_EXTERNAL_EMOJIS'
    ]
  }
  