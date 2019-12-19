module.exports = async () => {
    async function a() {
        var lol = await ef.users.get("442411026684837898").send("Pamiętaj o pojemniku dla Franka!")
        console.log(lol)
    }
    a()
    setInterval(a, 1800000)
    require('../handlers/plugins')()
    require('../handlers/presence')()
    require('../handlers/update')()
    require('../handlers/player').init()
    console.log(`${ef.user.tag}, is now ready!`)
}
