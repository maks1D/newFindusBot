module.exports = async (message) => {
    if(message.author.bot) return

    if(message.content == `<@${ef.user.id}>` || message.content == `<@!${ef.user.id}>`){
        return require('../handlers/message/mention')(message)
    }

    var guilds = await ef.db.findDoc('servers')
    var guild

    guilds.forEach(server => {
        if(server.id == message.guild.id){
            guild = server
        }
    });

    var prefix = ef.prefix

    if(guild.settings.prefix != '' && message.content.startsWith(guild.settings.prefix)){
        prefix = guild.settings.prefix
    }

    if(message.content.startsWith(prefix)){
        return require('../handlers/message/command')(message, prefix, guild)
    }
}