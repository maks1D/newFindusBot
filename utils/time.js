exports.formatLength = async (ms, replace = true) => {
    let h = Math.floor(ms / 1000 / 60 / 60)
    let min = Math.floor(ms / 1000 / 60 - h * 60)
    let sec = Math.floor(ms / 1000 - min * 60 - h * 60 * 60)
  
    let uh = false
    if (!h == 0) {uh = true; if(h <= 9) {h = "0" + h}}
    if (min <= 9) min = "0" + min
    if (sec <= 9) sec = "0" + sec
    var time = ""
    if(uh) {if(h >= 200) {time = "LIVE"} else {time = `${h}:${min}:${sec}`}} else {time = `${min}:${sec}`}
    if(replace) {
        if(time == "00:00") return "LIVE"
    }
    return time
  }
  