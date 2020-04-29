module.exports = async (member) => {
    var channel

    var servers = await ef.db.findDoc('servers')
    var guild

    servers.forEach(server => {
        if(server.id == member.guild.id){
            guild = server
        }
    });

    if(guild.settings.welcomer.enabled == "true"){

        channel = ef.channels.get(guild.settings.welcomer.channel)

        if(!channel) return

        var msg = guild.settings.welcomer.message
            .replace(new RegExp("{user.name}", "g"), member.user.username)
            .replace(new RegExp("{user.mention}", "g"), `<@${member.user.id}>`)
            .replace(new RegExp("{user.tag}", "g"), member.user.discriminator)
            .replace(new RegExp("{user.id}", "g"), member.user.id)

        channel.send(msg).catch(e => {
            require('../handlers/error')(channel, {}, e, true)
        })

        if(guild.settings.welcomer.roleGive !== '') {
            ef.guilds.get(guild.id).addRole(guild.settings.welcomer.roleGive).catch(e => {})
        }
    }
}