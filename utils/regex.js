exports.spotify = async (text) => {
    const match = /https?:\/\/(?:open\.)?spotify\.com\/track\/([a-zA-Z0-9]{22})/i.exec(text)
    if (match) return match
    else return false
}
  