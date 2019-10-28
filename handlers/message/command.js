module.exports = async (message, prefix, guild) => {
    var [commandName, ...args] = message.content.slice(prefix.length).split(/ +/g)
    
    var command

    await ef.plugins.forEach(plugin => {
        const commandMatch = plugin.commands.find(cmd =>
            cmd.data.triggers && cmd.data.triggers.includes(commandName.toLowerCase())
        )
        if(commandMatch !== undefined){
            command = commandMatch
        }
    })

    if(!command) return

    command.data = await Object.assign({
        voice: false,
        usage: ['{prefix}{command}'],
        developer: false,
        args: [],
        userPerms: [],
        botPerms: []
    }, command.data)

    if(!ef.files.roles.developers.includes(message.author.id) && command.data.developer){
        return ef.models.def({
            object: message,
            message: `\`Ta komenda jest tylko dla developerów!\``,
            color: ef.files.colors.red
        })
    }

    if(command.data.voice == true && !message.member.voiceChannel) {
        return ef.models.def({
            object: message,
            message: `\`Najpierw połącz się z kanałem głosowym!\``,
            color: ef.files.colors.red
        })
    }

    const userPerms = message.guild.members.get(message.author.id).permissions
    const botPerms = message.guild.members.get(ef.user.id).permissions

    if(command.data.userPerms.some(perm => !userPerms.has(perm)) && !ef.files.roles.developers.includes(message.author.id)) {
        const perm = command.data.userPerms.filter(perm => !userPerms.has(perm))[0]
        return ef.models.def({
            object: message,
            message: `Potrzebujesz uprawnienia: \`${perm.replace(`_`,` `)}\` aby użyć tej komendy!`,
            color: ef.files.colors.red
        })
    }

    if (command.data.botPerms.some(perm => !botPerms.has(perm))) {
        const perm = command.data.botPerms.filter(perm => !botPerms.has(perm))[0]
        return ef.models.def({
            object: message,
            message: `${ef.user.username} nie posiada następującego uprawnienia: \`${perm.replace(`_`,` `)}\`!`,
            color: ef.files.colors.red
        })
    }

    if(await require('../args')(args, command, message)) return

    command.output({
        command: command,
        message: message,
        args: args,
        guild: guild
    })
}