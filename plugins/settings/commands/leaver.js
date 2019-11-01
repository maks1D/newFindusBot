exports.output = async ({message, guild, args}) => {

    if(args.length >= 2){

        if(args[0] == 'kanał'){
            
            if(args[1]){

                var id = args[1].replace(/[<#>]/g, '')
                var channel

                if(message.guild.channels.get(id)){
                    channel = message.guild.channels.get(id).id
                } else if(message.guild.channels.get(args[1])) {
                    channel = message.guild.channels.get(args[1]).id
                }
                if(channel){
                    ef.db.editDoc({'id': `${guild.id}`}, {"settings.leaver.channel": channel}, 'servers')
                    return ef.models.send({
                        object: message,
                        message: `Ustawiono kanał na: <#${channel}>.`,
                    })
                } else {
                    return ef.models.send({
                        object: message,
                        message: `Nie znaleziono kanału!`,
                        color: ef.colors.red
                    })
                }
            } else {
                return ef.models.send({
                    object: message,
                    message: `Musisz wzmiankować kanał!`,
                    color: ef.colors.red
                })
            }
        } else if(args[0] == "wiadomość"){
            args.shift()
            var mess = args.join(' ')
            ef.db.editDoc({'id': `${guild.id}`}, {"settings.leaver.message": mess}, 'servers')
            return ef.models.send({
                object: message,
                message: `Nowa wiadomość pomyślnie ustawiona!`
            })
        }
    } else if(args[0] == 'on' || args[0] == 'off'){
        var statement = args[0] == 'on' ? "true" : "false"
        ef.db.editDoc({'id': `${guild.id}`}, {"settings.leaver.enabled": statement}, 'servers')
        return ef.models.send({
            object: message,
            message: `Leaver został ${args[0] == "on" ? "włączony" : "wyłączony"}.`
        })
    }

    ef.models.send({
        object: message,
        message: `Leaver na twoim serwerze jest ${guild.settings.leaver.enabled == "true" ? `włączony` : `wyłączony`},
                  Kanał: ${guild.settings.leaver.channel != "undefined" ? `<#${guild.settings.leaver.channel}>` : `\`[Nie ustawiony]\``},
                  Wiadomość: ${guild.settings.leaver.message != "undefined" ? `\`${guild.settings.leaver.message}\`` : `\`[Nie ustawiona]\``}.
                  
                  Aby zmienić ustawienia:
                  **kanału**, wpisz: \`${ef.prefix}leaver kanał <#nowy kanał>\`,
                  **wiadomości**, wpisz: \`${ef.prefix}leaver wiadomość <nowa wiadomość>\`,
                  **włączenia**, wpisz \`${ef.prefix}leaver <on/off>\`
                `
    })
}

exports.data = {
    triggers: ['leaver'],
    description: 'Pokazuje ustawienia wiadomości żegnających członków serwera.',
    usage: [
        '{prefix}{command} kanał <#kanał>',
        '{prefix}{command} <on/off>',
        '{prefix}{command} wiadomość <wiadomość>',
        '\nZmienne w wiadomości: \n\`{user.name}\` - nazwa użytkownika\n\`{user.id}\` - id użytkownika\n\`{user.tag}\` - tag użytkownika (np. Findus#\`7449\`)\n{user.mention} - wzmianka użytkownika\n'
    ],
    userPerms: [
        "MANAGE_GUILD"
    ]
}
  