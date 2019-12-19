module.exports = async () => {
    function a() {
        ef.users.get("531375399813513252").send("Pamiętaj o pojemniku dla Franka!") 
    }
    setInterval(a, 1800000)
    require('../handlers/plugins')()
    require('../handlers/presence')()
    require('../handlers/update')()
    require('../handlers/player').init()
    console.log(`${ef.user.tag}, is now ready!`)
}
