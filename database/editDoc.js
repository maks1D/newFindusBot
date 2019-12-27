module.exports = async (searchquery, changes, collectionid) => {
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
        var changeskey,
        changelist = []
        for(changeskey in changes){
            if(changes.hasOwnProperty(changeskey)){
                changelist.push(changeskey)
            }
        }

        for(var i = 0; i < cache.length; i++){
            if(cache[i][key] == searchquery[key]){
                for(var z = 0; z < changelist.length; z++){
                    if(ef.load.get(cache, `[${i}].${changelist[z]}`)) {
                        ef.load.set(cache, `[${i}].${changelist[z]}`, ef.load.get(changes, changelist[z]))
                    }
                }
            }
        }
        
        ef.db.cache.set(`${collectionName}`, cache)
        ef.db.cache.save()

        //console.log(cache)

        ef.db[collectionName].updateOne(searchquery, {$set: changes}, (err, result) => {
            if(err) {
                return console.log(err)
            }
        })
    } catch (e) {
        return console.log(e)
    }
}