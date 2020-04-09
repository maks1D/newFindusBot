module.exports = async () => {
    if(ef.type == 'beta') return
    if(new Date().getDate() == 21 && ef.db.cache['botinfo'][0].reminded == 'false'){
        ef.db.editDoc({version: `${ef.releasenotes.version}`}, {reminded: 'true'}, 'botinfo')
        if(ef.type !== 'beta') { 
            ef.models.send({
                channel: ef.channelsdb.notifs,
                message: `:warning: **I'm about to be disabled by Heroku!**`,
                color: ef.colors.red
            })
        }
    }
    if(new Date().getDate() == 22) ef.db.editDoc({version: `${ef.releasenotes.version}`}, {reminded: 'false'}, 'botinfo')
}