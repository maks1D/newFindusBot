exports.output = async ({message, guild, args}) => {

    const plugin = ef.plugins.find(plugin => plugin.id == (args[0] ? args[0].toLowerCase() : '*'))

    if(plugin && !(plugin.devOnly && !ef.roles.developers.includes(message.author.id))){
        var commands = {
            normal: []
        }
        for(const command of plugin.commands){
            commands.normal.push(`\`${command.data.triggers[0]}\``)
        }
        return ef.models.send({
            object: message,
            title: `**${plugin.name}**`,
            message: `\u200B\nOpis: \`${plugin.description}\`
                      
                      Komendy:
                      ${commands.normal.join(', ')}`
        })

    }

    var command

    if(args[0]){
        await ef.plugins.forEach(plugin => {
            var match = plugin.commands.find(cmd => 
                cmd.data.triggers && cmd.data.triggers.includes(args[0].toLowerCase())
            )
            if(match !== undefined){
                command = match
            }
        })
        if(command){
            command.data = await Object.assign({
                voice: false,
                usage: ['{prefix}{command}'],
                developer: false,
                args: [],
                userPerms: [],
                botPerms: []
            }, command.data)

            return ef.models.send({
                object: message,
                title: `Komenda: **${command.data.triggers[0]}**`,
                message: `\u200B
                          Warianty: \`${command.data.triggers.join(', ')}\`
                          Opis: \`${command.data.description}\`
                          
                          Użycie:
                          \`${command.data.usage.join('\n').replace(/{prefix}/g, ef.prefix).replace(/{command}/g, command.data.triggers[0])}\``
            })
        }
    }


    var help = `\u200B\n`
    await ef.plugins.forEach(plugin => {
        if(!(plugin.devOnly && !ef.roles.developers.includes(message.author.id)) && !plugin.hiddenInHelp){
            help += `**${plugin.name}** (ID: \`${plugin.id}\`)\n`
        }
    });
    help += `\nWpisz: \`${ef.prefix}help <ID modułu>\` aby uzyskać szczegółowe inforamcje.`
    ef.models.send({
        object: message,
        title: `**Dostępne moduły:**`,
        message: help
    })
}

exports.data = {
    triggers: ['help'],
    description: 'Pokazuje komendy/moduły bota.',
}

//.help settings
//.help fn +
//.help +