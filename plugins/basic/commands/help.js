exports.output = async ({message, guild, args}) => {

    var translations = {en: [], pl: [], ru: []}

    const plugin = ef.plugins.find(plugin => plugin.id == (args[0] ? args[0].toLowerCase() : '*'))

    if(plugin && !(plugin.devOnly && !ef.roles.developers.includes(message.author.id))){
        var commands = {
            normal: []
        }
        for(const command of plugin.commands){
            if(command.data.hiddenInHelp !== true && command.data.disabled !== true) {
                commands.normal.push(`\`${command.data.triggers[0]}\``)
            }
        }
        translations.pl[0] = 
`\u200B
Opis: \`${!plugin.description.en ? plugin.description : plugin.description[guild.settings.language]}\`

Komendy:
${commands.normal.join(', ')}`
        translations.en[0] = 
`\u200B
Description: \`${!plugin.description.en ? plugin.description : plugin.description[guild.settings.language]}\`

Commands:
${commands.normal.join(', ')}`
        translations.ru[0] = 
`\u200B
Описание: \`${!plugin.description.en ? plugin.description : plugin.description[guild.settings.language]}\`

команды:
${commands.normal.join(', ')}`
        return ef.models.send({
            object: message,
            title: `**${!plugin.name.en ? plugin.name : plugin.name[guild.settings.language]}**`,
            message: `${translations[guild.settings.language][0]}`
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

            if(!(command.data.developer && !ef.roles.developers.includes(message.author.id)) && command.data.disabled !== true) {
                var title = {en: 'Command', pl: 'Komenda', ru: 'командование'}

                translations.pl[1] = 
`\u200B
Warianty: \`${command.data.triggers.join(', ')}\`
Opis: \`${!command.data.description.pl ? command.data.description : command.data.description[guild.settings.language]}\`

Użycie:
\`${!command.data.usage.pl ? command.data.usage.join('\n').replace(/{prefix}/g, ef.prefix).replace(/{command}/g, command.data.triggers[0]) : command.data.usage.pl.join('\n').replace(/{prefix}/g, ef.prefix).replace(/{command}/g, command.data.triggers[0])}\``
                translations.en[1] = 
`\u200B
Triggers: \`${command.data.triggers.join(', ')}\`
Description: \`${!command.data.description.en ? command.data.description : command.data.description[guild.settings.language]}\`

Usage:
\`${!command.data.usage.en ? command.data.usage.join('\n').replace(/{prefix}/g, ef.prefix).replace(/{command}/g, command.data.triggers[0]) : command.data.usage.en.join('\n').replace(/{prefix}/g, ef.prefix).replace(/{command}/g, command.data.triggers[0])}\``
                translations.ru[1] = 
`\u200B
Триггеры: \`${command.data.triggers.join(', ')}\`
описание: \`${!command.data.description.ru ? command.data.description : command.data.description[guild.settings.language]}\`

использование:
\`${!command.data.usage.ru ? command.data.usage.join('\n').replace(/{prefix}/g, ef.prefix).replace(/{command}/g, command.data.triggers[0]) : command.data.usage.ru.join('\n').replace(/{prefix}/g, ef.prefix).replace(/{command}/g, command.data.triggers[0])}\``

                return ef.models.send({
                    object: message,
                    title: `${title[guild.settings.language]}: **${command.data.triggers[0]}**`,
                    message: `${translations[guild.settings.language][1]}`
                })
            }
        }
    }


    var help = `\u200B\n`
    await ef.plugins.forEach(plugin => {
        if(!(plugin.devOnly && !ef.roles.developers.includes(message.author.id)) && !plugin.hiddenInHelp){
            help += `**${plugin.name.en ? plugin.name[guild.settings.language] : plugin.name}** (ID: \`${plugin.id}\`)\n`
        }
    })

    translations.pl[2] =
`\nWpisz: \`${ef.prefix}help <ID modułu>\`, aby uzyskać szczegółowe informacje.
Wpisz: \`${ef.prefix}language <pl/en/ru>\`, aby zmienić język.
Zaproś mnie [tutaj](https://discord.com/api/oauth2/authorize?client_id=538655104664862721&permissions=8&scope=bot).`
    translations.en[2] =
`\nType: \`${ef.prefix}help <plugin ID>\` to get detailed informations.
Type: \`${ef.prefix}language <pl/en/ru>\` to change language.
Invite me [here](https://discord.com/api/oauth2/authorize?client_id=538655104664862721&permissions=8&scope=bot).`
    translations.ru[2] =
`\nнапишите: \`${ef.prefix}help <плагины ID>\` чтобы получить подробную информацию.
напишите: \`${ef.prefix}language <pl/en/ru>\` чтобы сменить язык.
Invite me [here](https://discord.com/api/oauth2/authorize?client_id=538655104664862721&permissions=8&scope=bot).`
    
    help += translations[guild.settings.language][2]

    var title2 = {en: 'Available plugins', pl: 'Dostępne moduły', ru: 'Доступные плагины'}

    ef.models.send({
        object: message,
        title: `**${title2[guild.settings.language]}:**`,
        message: help
    })
}

exports.data = {
    triggers: ['help', '?'],
    description: {pl: 'Pokazuje komendy/moduły bota.', en: 'Shows bot commands / plugins.', ru: 'Показывает команды бота / плагины.'}
}
