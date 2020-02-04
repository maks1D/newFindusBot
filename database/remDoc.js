module.exports = async (searchquery, collectionid) => {
    try {
        var collectionName
        ef.db.collections.includes(collectionid) ? collectionName = collectionid : collectionName = ef.db.collections[collectionid]

        var key
        for(key in searchquery) {
            if(searchquery.hasOwnProperty(key)){
                break
            }
        }

        for(var i = 0; i < ef.db.cache[collectionName].length; i++){
            if(ef.db.cache[collectionName][i][key] == searchquery[key]){
                ef.db.cache[collectionName].splice(i, 1)
            }
        }

        ef.db[collectionName].deleteOne(searchquery, (err, result) => {
            if(err) {
                return console.log(err)
            }
        })
    } catch (e) {
        return console.log(e)
    }
}