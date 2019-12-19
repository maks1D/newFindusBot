module.exports = async () => {
    require('../handlers/plugins')()
    require('../handlers/presence')()
    require('../handlers/update')()
    require('../handlers/player').init()
    console.log(`${ef.user.tag}, is now ready!`)
}
