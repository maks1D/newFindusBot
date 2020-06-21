module.exports = async (oldMem, newMem) => {
    try{
        let vC = oldMem.voiceChannelID
        let player = await ef.player.players.get(oldMem.guild.id)
        if (!player) return
        if (ef.player.voiceStates.has(oldMem.guild.id) && vC != ef.player.voiceStates.get(oldMem.guild.id).channel_id) return
        let botChID = ef.player.voiceStates.get(oldMem.guild.id).channel_id
        if (!ef.channels.get(botChID)) return
        if (ef.queue[oldMem.guild.id].autoleave !== true) return
        if (ef.channels.get(botChID).members.size == 1) {
            setTimeout(async () => {
                if (ef.channels.get(botChID).members.size == 1) {
                    let queue = ef.queue[oldMem.guild.id]
                    if(queue) {
                        queue.songs = []
                        queue.loop = false
                        queue.repeat = false

                        await player.stop()
                    }
                    await ef.player.leave(oldMem.guild.id)

                    delete ef.queue[oldMem.guild.id]
                }
            }, 10 * 1000)
        }
    } catch(err) {
        console.log(err)
    }
}

  