exports.output = async ({message, guild, args}) => {
    var translations = {en: [], pl: [], ru: []}
    var id = message.mentions.members.array().length

    if(id == 0 || id > 25) {
        translations.pl[0] = `${ef.emotes.markNo}Wprowadź poprawną liczbę użytkowników.`
        translations.en[0] = `${ef.emotes.markNo}Enter the correct number of users.`
        translations.ru[0] = `${ef.emotes.markNo}Введите правильное количество пользователей.`
        return ef.models.send({
            object: message,
            message: `${translations[guild.settings.language][0]}`,
            color: ef.colors.red
        })
    } else if(args.length == id) {
        translations.pl[1] = `${ef.emotes.markNo}Wprowadź poprawną liczbę argumentów.`
        translations.en[1] = `${ef.emotes.markNo}Enter the correct number of arguments.`
        translations.ru[1] = `${ef.emotes.markNo}Введите правильное количество аргументов`
        return ef.models.send({
            object: message,
            message: `${translations[guild.settings.language][1]}`,
            color: ef.colors.red
        })
    }
    var users = []
    var roles = []
    var assignments = []
    for(var i = 0; i < id; i++) {
        users.push(message.mentions.members.array()[i])
    }
    for(var i = id; i < args.length; i++) {
        roles.push(args[i])
    }
    for(var i = 0; i < users.length; i++) {
        var index = await ef.utils.number.random(0, roles.length - 1)
        var data = {
            user: users[i],
            role: roles[index]
        }
        assignments.push(data)
        if(!(args.length < id * 2)) {
            roles.splice(index, 1)
        } else {
            if(roles.length == 1) continue
            var temp = 0
            for(var x = 0; x < assignments.length; x++) {
                if(assignments[x].role == roles[index]) temp++
            }
            if(temp == Math.floor(users.length / roles.length)) roles.splice(index, 1)
        }
    }
    if(args.length < id * 2) {
        translations.pl[2] = `**Drużyny:**\n`
        translations.en[2] = `**Teams:**\n`
        translations.ru[2] = `**Команды:**\n`
        var output = `${translations[guild.settings.language][2]}`
    } else {
        translations.pl[2] = `**Przypisania:**\n`
        translations.en[2] = `**Assignments:**\n`
        translations.ru[2] = `**назначение:**\n`
        var output = `${translations[guild.settings.language][2]}`
    }
    for(var i = 0; i < assignments.length; i++) {
        output += `<@${assignments[i].user.id}>: \`${assignments[i].role}\`\n`
    }
    ef.models.send({
        object: message,
        message: `${output}`
    })
}

exports.data = {
    triggers: ['assign'],
    description: {
        pl: 'Przypisuje danym osobom daną ilość ról. (Max 25)',
        en: 'Assigns a given number of roles to a given persons. (Max 25)',
        ru: 'Назначает определенное количество ролей указанному количеству людей. (Максимум 25)'
    },
    usage: {
        pl: [
            '{prefix}{command} <Wzmianki osób> <role oddzielone spacjami>'
        ],
        en: [
            '{prefix}{command} <user mentions> <roles separated by spaces>'
        ],
        ru: [
            '{prefix}{command} <Упоминание людей> <роли, разделенные пробелами>'
        ]
    }
}