module.exports = async (searchquery, collectionid) => {
    try {
        var collectionName
        ef.db.collections.includes(collectionid) ? collectionName = collectionid : collectionName = ef.db.collections[collectionid]

        var cache = ef.db.cache.get(collectionName)
        var key
        for(key in searchquery) {
            if(searchquery.hasOwnProperty(key)){
                break
            }
        }

        for(var i = 0; i < cache.length; i++){
            if(cache[i][key] == searchquery[key]){
                cache.splice(i, 1)
            }
        }
        
        ef.db.cache.set(`${collectionName}`, cache)
        ef.db.cache.save()

        ef.db[collectionName].deleteOne(searchquery, (err, result) => {
            if(err) {
                return console.log(err)
            }
        })
    } catch (e) {
        return console.log(e)
    }
}