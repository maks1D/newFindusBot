module.exports = async () => {
    function setPresence() {
        ef.user.setPresence(
        {
            game:
            {
                type: 'WATCHING',
                name: `${ef.prefix}help on ${ef.guilds.size} guilds!`,
            },
            status: 'online'
        })
    }
    setPresence()
    ef.botPresence = setInterval(setPresence, 10000)
}

//PLAYING
//WATCHING
//LISTENING
//online
//idle
//dnd
//invisible