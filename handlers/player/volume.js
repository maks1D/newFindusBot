module.exports = async function volume(message, args) {
    if(ef.queue[message.guild.id]){
        if(args[0] == 'earrape') {
            ef.queue[message.guild.id].player._volume = 20
            ef.queue[message.guild.id].volume = 2000
        } else {
            var volume = parseInt(args[0])
            if(volume <= 1000 && volume >= 0) {
                ef.queue[message.guild.id].player._volume = volume/100
                ef.queue[message.guild.id].volume = volume
            } else {
                ef.queue[message.guild.id].player._volume = 10
                ef.queue[message.guild.id].volume = 1000
            }
        }
        return true
    } else {
        return false
    }
}