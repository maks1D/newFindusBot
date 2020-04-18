exports.output = async ({message, guild, args}) => {
    var id = message.mentions.members.array().length
    if(id == 0 || id > 25) {
        return ef.models.send({
            object: message,
            message: `${ef.emotes.markNo}Wprowadź poprawną liczbę ról i użytkowników.`,
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
        var index = Math.floor(Math.random() * (roles.length - 1))
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
        var output = '**Drużyny:**\n'
    } else {
        var output = '**Przypisania:**\n'
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
    description: 'Przypisuje danym osobom daną ilość ról. (Max 25)',
    usage: [
        '{prefix}{command} <Wzmianki osób> <role oddzielone spacjami>'
    ]
}