module.exports = async (collectionid) => {
    try {
        var collectionName
        ef.db.collections.includes(collectionid) ? collectionName = collectionid : collectionName = ef.db.collections[collectionid]

        var result = ef.db.cache[collectionName]

        return result
        
    } catch (e) {
        return console.log(e)
    }
}