module.exports = async (args, command, message, guild) => {

    var translations = {en: [], pl: [], ru: []}
  
    return new Promise(async (resolve, reject) => {
      
        if (!command.data.args) return resolve(false)

        var shortcut, shortcut2

        if(command.data.args.en) {
            shortcut = command.data.args[guild.settings.language]
        } else {
            shortcut = command.data.args
        }

        if(command.data.usage.en) {
            shortcut2 = command.data.usage[guild.settings.language]
        } else {
            shortcut2 = command.data.usage
        }

        if (shortcut.length > 0 && args.length < shortcut.length) {
            translations.pl[0] = 
`Poprawny sposób użycia:\n\`${shortcut2.join('\n')
.replace(/{prefix}/g, ef.prefix)
.replace(/{command}/g, command.data.triggers[0])}\``
            translations.en[0] = 
`Correct usage:\n\`${shortcut2.join('\n')
.replace(/{prefix}/g, ef.prefix)
.replace(/{command}/g, command.data.triggers[0])}\``
            translations.ru[0] = 
`Правильное использование:\n\`${shortcut2.join('\n')
.replace(/{prefix}/g, ef.prefix)
.replace(/{command}/g, command.data.triggers[0])}\``
            return error(message, translations[guild.settings.language][0])
        }

        for (i = 0; i < shortcut.length; i++) {
        
            if ((shortcut[i].type == 'mention' && !message.mentions.members.first()) || (shortcut[i].type == 'number' && isNaN(args[i]))) {
                translations.pl[1] = `Zły argument: \`[${shortcut[i].name}]\`\n\nMusi on być typu: \`[${shortcut[i].type}]\`!`
                translations.en[1] = `Wrong argument: \`[${shortcut[i].name}]\`\n\nIt have to be of type: \`[${shortcut[i].type}]\`!`
                translations.ru[1] = `Неправильный аргумент: \`[${shortcut[i].name}]\`\n\nОн должен быть типом: \`[${shortcut[i].type}]\`!`
                return error(message, translations[guild.settings.language][1])
            }
        }
        
        resolve(false)

        function error(message, text) {
            ef.models.send({
                object: message,
                message: text,
                color: ef.colors.red
            })
            resolve(true)
        }

    })

}
