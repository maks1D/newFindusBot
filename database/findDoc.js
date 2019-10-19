module.exports = async (collectionid) => {
    try {
        var result = await new Promise((resolve, reject) => {
            ef['db' + ef.collections[collectionid]].find().toArray((err, results) => {
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