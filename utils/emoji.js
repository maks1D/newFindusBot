exports.get = async (id, message) => {
    if(ef.emotes[id]){
        return ef.emojis.get(ef.emotes[id])
    }else if(ef.emotes[id]){
        return ef.emotes[id]
    }else{
        require('../handlers/error')(message, `EmojiNotFound - ${id}`, true)
        return ''
    }
}