module.exports = async () => {
    (function setPresence() {
        ef.user.setPresence(
            { game:
                { type: 'WATCHING',
                    name: `${ef.prefix}help on ${ef.guilds.size} servers!`
                },
                status: 'online'
            }
        )
        setTimeout(setPresence, 10000)
    })()
}
  