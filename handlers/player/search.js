var YouTube = require('youtube-node');
var YouTube_Search = new YouTube();
YouTube_Search.setKey(ef.tokens.youtubeapi)

module.exports = async function search(searchkey) {
    var records = 15
    var parsedSong
    var promise = await new Promise((resolve, reject) => {
        YouTube_Search.search(searchkey, records, (err, result) => {
            if(result.items[0] == undefined) {
                resolve('noVideo')
                return
            }
            for(var i = 0; i < records; i++) {
                if(result.items[i].id.kind == 'youtube#video') {
                    parsedSong = {
                        title: result.items[i].snippet.title.replace(/&quot;/g, "\"")
                                                            .replace(/&amp;/g, "&")
                                                            .replace(/&apos;/g, "'")
                                                            .replace(/&lt;/g, "<")
                                                            .replace(/&gt;/g, ">"),
                        channel: result.items[i].snippet.channelTitle,
                        imageURL: result.items[i].snippet.thumbnails.high.url,
                        url: `https://youtube.com/watch?v=${result.items[i].id.videoId}`
                    }
                    /*ef.music.player.getInfo(result.items[i].id.videoId, function (err, info) {
                        console.log(parsedSong)
                        console.log(info)
                    })*/
                    return resolve(parsedSong)
                } else if(i == records - 1) {
                    return resolve('noVideo')
                }
            }
        })
    })
    return await promise
}