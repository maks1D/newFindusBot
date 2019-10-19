module.exports = async (doc, collectionid) => {
    try {
        ef['db' + ef.collections[collectionid]].insertOne(doc, (err, result) => {
            if(err) {
                return console.log(err)
            }
        })
    } catch (e) {
        return console.log(e)
    }
}