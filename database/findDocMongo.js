module.exports = async (collectionid) => {
    try {
        var collectionName
        ef.db.collections.includes(collectionid) ? collectionName = collectionid : collectionName = ef.db.collections[collectionid]

        var result = await new Promise((resolve, reject) => {
            ef.db[collectionName].find().toArray((err, results) => {
                err 
                ? reject(err) 
                : resolve(results)
            })
        })

        return result
        
    } catch (e) {
        return console.log(e)
    }
}