exports.output = async ({message, args}) => {
    const emojis = ['🇦', '🇧', '🇨', '🇩', '🇪', '🇫', '🇬', '🇭', '🇮', '🇯', '🇰', '🇱', '🇲', '🇳', '🇴', '🇵', '🇶', '🇷', '🇸', '🇹', '🇺', '🇻', '🇼', '🇽', '🇾', '🇿']
    
    args = args.join(' ')

    if (!args.includes(",")) {
        const poll = await ef.models.send({
            object: message,
            message: `\`${args}\``,
            author: [`${message.author.tag} • Poll`, message.author.displayAvatarURL]
        })
        await poll.react(ef.emotes.markYesID)
        await poll.react(ef.emotes.markNoID)
        return message.delete(1000)
    }

    if (args.length - 1 > 26) {
        return ef.models.send({
            object: message,
            message: `${ef.emotes.markNo} You have provided too much options. Maximum amount is 26.`,
            color: ef.colors.red
        })
    }

    args = args.split(",")
    let text = `\`${args[0]}\`\n\n`
    for (let i = 0; i < args.length - 1; i++) {
        if (i < 26) {
            text += `${':regional_indicator_' + String.fromCharCode('a'.charCodeAt(0) + i) + ':'}\`${args[i+1]}\`\n`
        }
    }

    const poll = await ef.models.send({
        object: message,
        message: text,
        author: [`${message.author.tag} • Poll`, message.author.displayAvatarURL]
    })

    for (i = 0; i < args.length - 1; i++) {
        if (i < 20) {
            await poll.react(emojis[i])
        }
    }

    return message.delete(1000)
  }
  
  exports.data = {
    triggers: ['poll', 'vote'],
    description: 'Creates poll. Max 26 options.',
    usage: [
        '{prefix}{command} <text>',
        '{prefix}{command} <text>, <option 1>, <option 2>, ...',
    ],
    args: [
        {
            'type':'text',
            'name':'text'
        }
    ]
  }
  