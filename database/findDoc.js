module.exports = async (collectionid) => {
    try {
        var collectionName
        ef.db.collections.includes(collectionid) ? collectionName = collectionid : collectionName = ef.db.collections[collectionid]

        var result = await new Promise((resolve, reject) => {
            resolve(ef.db.cache.get(`${collectionName}`))
        })

        return result
        
    } catch (e) {
        return console.log(e)
    }
}