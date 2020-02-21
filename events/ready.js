module.exports = async () => {
    require('../handlers/plugins')()
    require('../handlers/presence')()
    require('../handlers/update')()
    require('../handlers/player').init()
    require('../handlers/dbupdate').init()
    if(ef.tokens.istest == 'true') {
        process.exit(0)
    }
    if(new Date().getDate() == 21 && ef.db.cache['botinfo'][0].reminded == 'false'){
        ef.db.editDoc({version: `${ef.releasenotes.version}`}, {reminded: 'true'}, 'botinfo')
        ef.models.send({
            channel: ef.channelsdb.notifs,
            message: `**I'm about to be disabled by Heroku!**`,
            color: ef.colors.red
        })
    }
    if(new Date().getDate() == 22) ef.db.editDoc({version: `${ef.releasenotes.version}`}, {reminded: 'false'}, 'botinfo')
    console.log(`${ef.user.tag}, is now ready!`)
}
