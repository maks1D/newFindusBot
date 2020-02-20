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

    if(ef.type !== 'beta') {
        ef.db.cache['botinfo'][0].commandsdone ++
    }

    if(ef.freezed == true && !ef.roles.developers.includes(message.author.id)) {
        if(ef.type != 'beta') {
            ef.models.send({
                channel: ef.channelsdb.logs,
                title: message.content,
                message: `**User:** \`${message.author.tag}\`\n**User ID:** \`${message.author.id}\`\n**Server:** \`${message.guild.name}\`\n**Server ID:** \`${message.guild.id}\``,
                thumbnail: message.author.displayAvatarURL,
                color: ef.colors.blue
            })
        }
        return ef.models.send({
            object: message,
            message: `\`Developer tymczasowo zawiesił możliwość korzystania z komend! Jeśli chcesz być na bierząco dołącz na oficjany serwer FindusBoTa: \`\n**https://discord.gg/SgKzpgY**`,
            color: ef.colors.red
        })
    }

    command.data = await Object.assign({
        voice: false,
        usage: ['{prefix}{command}'],
        developer: false,
        args: [],
        userPerms: [],
        botPerms: []
    }, command.data)

    if(command.data.disabled === true) return

    if(!ef.roles.developers.includes(message.author.id) && command.data.developer){
        return ef.models.send({
            object: message,
            message: `\`Ta komenda jest tylko dla developerów!\``,
            color: ef.colors.red
        })
    }

    const userPerms = message.guild.members.get(message.author.id).permissions
    const botPerms = message.guild.members.get(ef.user.id).permissions

    if(command.data.userPerms.some(perm => !userPerms.has(perm)) && !ef.roles.developers.includes(message.author.id)) {
        const perm = command.data.userPerms.filter(perm => !userPerms.has(perm))[0]
        return ef.models.send({
            object: message,
            message: `Potrzebujesz uprawnienia: \`${perm.replace(`_`,` `).toTitleCase()}\` aby użyć tej komendy!`,
            color: ef.colors.red
        })
    }

    if (command.data.botPerms.some(perm => !botPerms.has(perm))) {
        const perm = command.data.botPerms.filter(perm => !botPerms.has(perm))[0]
        return ef.models.send({
            object: message,
            message: `${ef.user.username} nie posiada następującego uprawnienia: \`${perm.replace(`_`,` `).toTitleCase()}\`!`,
            color: ef.colors.red
        })
    }

    if(await require('../args')(args, command, message)) return

    command.output({
        command: command,
        message: message,
        args: args,
        guild: guild
    })
    .catch(err => {
        return require('../error')(message, err)
    })
    if(ef.type != 'beta') {
        ef.models.send({
            channel: ef.channelsdb.logs,
            title: message.content,
            message: `**User:** \`${message.author.tag}\`\n**User ID:** \`${message.author.id}\`\n**Server:** \`${message.guild.name}\`\n**Server ID:** \`${message.guild.id}\``,
            thumbnail: message.author.displayAvatarURL,
            color: ef.colors.aqua
        })
    }
}