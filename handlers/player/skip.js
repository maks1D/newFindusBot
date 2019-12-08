module.exports = async function skip(message) {
    if(ef.queue[message.guild.id] && ef.queue[message.guild.id].nowPlaying != ''){
        ef.queue[message.guild.id].player.end()
        return true
    } else {
        return false
    }
}