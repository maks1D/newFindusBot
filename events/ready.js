module.exports = async () => {
    require('../handlers/plugins')()
    console.log(`${ef.user.tag}, is now ready!`)
}