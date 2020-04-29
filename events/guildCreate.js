module.exports = async (guild) => {
    var guildsdb = await ef.db.findDoc('servers')
    var exist = false
    guildsdb.forEach(guilddb => {
        if(guilddb.id == guild.id) exist = true
    })
    if(exist) return
    ef.db.addDoc({
        id: `${guild.id}`,
        settings: {
            welcomer: {
                enabled: "false",
                channel: "undefined",
                message: "undefined",
                roleGive: ''
            },
            leaver: {
                enabled: "false",
                channel: "undefined",
                message: "undefined"
            },
            language: "en",
            prefix: `${ef.prefix}`
        }
    }, 'servers')
}
