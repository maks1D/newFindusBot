module.exports = async (searchquery, collectionid) => {
    try {
        ef['db' + ef.collections[collectionid]].deleteOne(searchquery, (err, result) => {
            if(err) {
                return console.log(err)
            }
        })
    } catch (e) {
        return console.log(e)
    }
}