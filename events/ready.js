module.exports = async () => {
    require('../handlers/plugins')()
    require('../handlers/presence')()
    console.log(`${ef.user.tag}, is now ready!`)
}