module.exports = class queue {
    constructor(guildid) {
        this.nowPlaying = {
            title: '',
            url: '',
            paused: false,
            length: 0,
            req: '',
            track: '',
            pd: 0, 
            date: Date.now()
        }
        this.queue = []
        this.volume = 100
        this.autoleave = true
        this.autoreconnect = false
        this.autounmute = false
        this.npmessages = true
        this.loop = false
        this.repeat = false
        this.channel = ''
        this.pause = this.pause
        this.resume = this.resume

        ef.queue[guildid] = this
    }

    pause() {
        this.nowPlaying.paused = true
        this.nowPlaying.pd = Date.now() - this.nowPlaying.date
    }
    
    resume() {
        this.nowPlaying.date = Date.now() - this.nowPlaying.pd
        this.nowPlaying.paused = false
    }
}