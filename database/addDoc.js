module.exports = async (doc, collectionid) => {
    try {
        var collectionName
        ef.db.collections.includes(collectionid) ? collectionName = collectionid : collectionName = ef.db.collections[collectionid]

        var cache = ef.db.cache.get(collectionName)
        cache.push(doc)
        
        ef.db.cache.set(`${collectionName}`, cache)
        ef.db.cache.save()

        ef.db[collectionName].insertOne(doc, (err, result) => {
            if(err) {
                return console.log(err)
            }
        })
    } catch (e) {
        return console.log(e)
    }
}