module.exports = async function pause(message) {
    if(ef.queue[message.guild.id] && ef.queue[message.guild.id].nowPlaying != ''){
        ef.queue[message.guild.id].player.player.currentStream.dispatcher.paused = true
        return true
    } else {
        return false
    }
}