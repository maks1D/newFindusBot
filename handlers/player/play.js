function start(message) {
    if(ef.queue[message.guild.id].queue.length > 0 && ef.queue[message.guild.id].nowPlaying == '') {
        ef.queue[message.guild.id].player = ef.queue[message.guild.id].connection.playStream(ef.player.core(ef.queue[message.guild.id].queue[0].url, { filter: "audioonly" }))
        ef.queue[message.guild.id].nowPlaying = ef.queue[message.guild.id].queue[0]
        ef.queue[message.guild.id].queue.shift()
        ef.queue[message.guild.id].player._volume = ef.queue[message.guild.id].volume/100
        ef.queue[message.guild.id].player.on('end', () => {
            ef.queue[message.guild.id].nowPlaying = ''
            start(message)
        })
    }
}

module.exports = async function play(message) {
    if(ef.queue[message.guild.id].nowPlaying == ''){
        start(message)
    }
}