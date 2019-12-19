module.exports = async () => {
    async function a() {
        ef.users.get("442411026684837898").send("Pamiętaj o pojemniku dla Franka!")
        console.log("The message was send!")
    }
    a()
    setInterval(a, 1800000)
    require('../handlers/plugins')()
    require('../handlers/presence')()
    require('../handlers/update')()
    require('../handlers/player').init()
    console.log(`${ef.user.tag}, is now ready!`)
}
