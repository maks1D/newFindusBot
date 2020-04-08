module.exports = async (message, prefix, guild) => {
    var translations = {en: [], pl: [], ru: []}

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
        translations.pl[0] = `\`Developer tymczasowo zawiesił możliwość korzystania z komend! Jeśli chcesz być na bieżąco dołącz na oficjany serwer FindusBoTa\` [tutaj](https://discord.gg/SgKzpgY).`
        translations.en[0] = `\`The developer has temporarily suspended the ability to use commands! If you want to be up to date, join the official FindusBoT server\` [here](https://discord.gg/SgKzpgY).`
        translations.ru[0] = `\`Разработчик временно приостановил возможность использования команд! Если вы хотите быть в курсе, присоединяйтесь к официальному серверу FindusBoT\` [здесь](https://discord.gg/SgKzpgY).` 
        return ef.models.send({
            object: message,
            message: `${translations[guild.settings.language][0]}`,
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
        translations.pl[1] = `${ef.emotes.markNo}\`Ta komenda jest tylko dla developerów!\``
        translations.en[1] = `${ef.emotes.markNo}\`This command is for developers only!\``
        translations.ru[1] = `${ef.emotes.markNo}\`Эта командование только для разработчиков!\``
        return ef.models.send({
            object: message,
            message: `${translations[guild.settings.language][1]}`,
            color: ef.colors.red
        })
    }

    const userPerms = message.guild.members.get(message.author.id).permissions
    const botPerms = message.guild.members.get(ef.user.id).permissions

    if(command.data.userPerms.some(perm => !userPerms.has(perm)) && !ef.roles.developers.includes(message.author.id)) {
        const perm = command.data.userPerms.filter(perm => !userPerms.has(perm))[0]
        translations.pl[2] = `${ef.emotes.markNo}Potrzebujesz uprawnienia: \`${perm.replace(`_`,` `).toTitleCase()}\` aby użyć tej komendy!`
        translations.en[2] = `${ef.emotes.markNo}You need \`${perm.replace(`_`,` `).toTitleCase()}\` permission to use this command!`
        translations.ru[2] = `${ef.emotes.markNo}Вам нужно \`${perm.replace(`_`,` `).toTitleCase()}\` разрешение, чтобы использовать эту команду!`
        return ef.models.send({
            object: message,
            message: `${translations[guild.settings.language][2]}`,
            color: ef.colors.red
        })
    }

    if (command.data.botPerms.some(perm => !botPerms.has(perm))) {
        const perm = command.data.botPerms.filter(perm => !botPerms.has(perm))[0]
        translations.pl[3] = `${ef.emotes.markNo}**${ef.user.username}** nie posiada następującego uprawnienia: \`${perm.replace(`_`,` `).toTitleCase()}\`!`
        translations.en[3] = `${ef.emotes.markNo}**${ef.user.username}** does not have the following permission: \`${perm.replace(`_`,` `).toTitleCase()}\`!`
        translations.ru[3] = `${ef.emotes.markNo}**${ef.user.username}** не имеет следующего разрешения: \`${perm.replace(`_`,` `).toTitleCase()}\`!`
        return ef.models.send({
            object: message,
            message: `${translations[guild.settings.language][3]}`,
            color: ef.colors.red
        })
    }

    if(await require('../args')(args, command, message, guild)) return

    command.output({
        command: command,
        message: message,
        args: args,
        guild: guild
    })
    .catch(err => {
        return require('../error')(message, guild, err)
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