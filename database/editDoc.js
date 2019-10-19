module.exports = async (searchquery, changes, collectionid) => {
    try {
        ef['db' + ef.collections[collectionid]].updateOne(searchquery, {$set: changes}, (err, result) => {
            if(err) {
                return console.log(err)
            }
        })
    } catch (e) {
        return console.log(e)
    }
}