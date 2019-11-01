module.exports = async (args, command, message) => {
  
    return new Promise(async (resolve, reject) => {
      
        if (!command.data.args) return resolve(false)

        if (command.data.args.length > 0 && args.length < command.data.args.length) {
            return error(message,`Poprawny sposób użycia:\`\n
                                ${command.data.usage
                                .join('\n')
                                .replace(/{prefix}/g, ef.prefix)
                                .replace(/{command}/g, command.data.triggers[0])}
                                \``
                    )
        }

        for (i = 0; i < command.data.args.length; i++) {
        
            if (command.data.args[i].type == 'mention' && !message.mentions.members.first()) {
                return error(message, `Zły argument: \`[${command.data.args[i].name}]\`\n\n Musi on być typu: \`[${command.data.args[i].type}]\`!`)
            }
            
            if (command.data.args[i].type == 'number' && isNaN(args[i])) {
                return error(message, `Zły argument: \`[${command.data.args[i].name}]\`\n\n Musi on być typu: \`[${command.data.args[i].type}]\`!`)
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
