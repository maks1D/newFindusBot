exports.output = async ({message, guild, args}) => {
    if(args[0] == '-reset'){
        if(ef.botPresence._idleTimeout == -1) require('../../../handlers/presence')()

        ef.models.send({
            object: message,
            message: `${ef.emotes.markYes} Pomyślnie zresetowano aktywność!`
        })
    }else if(args[0] == '-set'){
        
        if((args[1] == 'watch' || args[1] == 'play' || args[1] == 'listen') && args[3] && (args[2] == 'online' || args[2] == 'idle' || args[2] == 'dnd')) {
            
            if(ef.botPresence._idleTimeout != -1) clearInterval(ef.botPresence)

            args.shift()
            var activity = args[0] + 'ing'
            var status = args[1]
            args.shift()
            args.shift()
            ef.user.setPresence(
            {
                game:
                {
                    type: `${activity}`,
                    name: `${args.join(' ')}`,
                },
                status: `${status}`
            })

            ef.models.send({
                object: message,
                message: `${ef.emotes.markYes} Pomyślnie ustawiono aktywność!`
            })
        } else {
            if(args[1] == 'invisible'){

                if(ef.botPresence._idleTimeout != -1) clearInterval(ef.botPresence)

                args.shift()

                var status = args[0]

                ef.user.setPresence({
                    status: `${status}`
                })
        
                ef.models.send({
                    object: message,
                    message: `${ef.emotes.markYes} Pomyślnie ustawiono aktywność!`
                })
            } else if(!(args[1] == 'watch' || args[1] == 'play' || args[1] == 'listen')){
                ef.models.send({
                    object: message,
                    message: `${ef.emotes.markNo} Agrument \`typ aktywności\` niepoprawny!`,
                    color: ef.colors.red
                })
            } else if(!(args[2] == 'online' || args[2] == 'idle' || args[2] == 'dnd')) {
                ef.models.send({
                    object: message,
                    message: `${ef.emotes.markNo} Agrument \`status\` niepoprawny!`,
                    color: ef.colors.red
                })
            } else if(!args[3]) {
                ef.models.send({
                    object: message,
                    message: `${ef.emotes.markNo} Nie podano nowej aktywności!`,
                    color: ef.colors.red
                })
            }
        }
    }
}

exports.data = {
    triggers: ['activity'],
    description: 'Zmienia aktywność bota.',
    usage: [
        '{prefix}{command} -set [watch/listen/play] [online/idle/dnd] <nowa aktywność>',
        '{prefix}{command} -set invisible',
        '{prefix}{command} -reset'
    ],
    developer: true
}