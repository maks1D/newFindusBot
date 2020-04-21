module.exports = async (message) => {
    if(message.author.bot) return
    if(!message.guild) return

    var guilds = await ef.db.findDoc('servers')
    var guild = 0

    guilds.forEach(server => {
        if(server.id == message.guild.id){
            guild = server
        }
    });

    if(guild == 0) {
        var data = {
            id: `${message.guild.id}`,
            settings: {
                welcomer: {
                    enabled: "false",
                    channel: "undefined",
                    message: "undefined"
                },
                leaver: {
                    enabled: "false",
                    channel: "undefined",
                    message: "undefined"
                },
                language: "en",
                prefix: `${ef.prefix}`
            }
        }
        ef.db.addDoc(data, 'servers')
        guild = data
    }

    if(message.content == `<@${ef.user.id}>` || message.content == `<@!${ef.user.id}>`){
        return require('../handlers/message/mention')(message, guild)
    }

    if (message.content.startsWith('$fcli') && ef.roles.developers.includes(message.author.id)) {
        return require('../handlers/message/cli')(message)
    }

    var prefix = ef.prefix

    if(guild.settings.prefix != '' && message.content.startsWith(guild.settings.prefix)){
        prefix = guild.settings.prefix
    }

    if(message.content.startsWith(prefix)){
        return require('../handlers/message/command')(message, prefix, guild)
    }
}