const eReq = (event) => require(`../events/${event}`)
class events {
    constructor(ef) {
        ef.on('ready', () => eReq('ready')())
        ef.on('message', message => eReq('message')(message))
        ef.on('guildMemberAdd', member => eReq('guildMemberAdd')(member))
        ef.on('guildMemberRemove', member => eReq('guildMemberRemove')(member))
        ef.on('guildCreate', guild => eReq('guildCreate')(guild))
        ef.on('guildDelete', guild => eReq('guildDelete')(guild))
    }
}

module.exports = events