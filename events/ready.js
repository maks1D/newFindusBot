module.exports = async () => {
    require('../handlers/plugins')()
    require('../handlers/presence')()
    require('../handlers/update')()
    require('../handlers/player').init()
    require('../handlers/dbupdate').init()
    require('../handlers/herokuhourlimit')()
    if(ef.tokens.istest == 'true') {
        process.exit(0)
    }
    console.log(`${ef.user.tag}, is now ready!`)
}
