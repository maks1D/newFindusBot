module.exports = async () => {
    require('../handlers/plugins')()
    require('../handlers/presence')()
    require('../handlers/update')()
    require('../handlers/player').init()
    require('../handlers/dbupdate').init()
    if(new Date().getDate() == 21){
        ef.models.send({
            channel: ef.channelsdb.notifs,
            message: `I'am about to be disabled by Heroku!`,
            color: ef.colors.red
        })
    }
    console.log(`${ef.user.tag}, is now ready!`)
}
