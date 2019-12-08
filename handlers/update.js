module.exports = async () => {
    var oldversion = await ef.db.findDoc('botinfo')
    oldversion = oldversion[0].version
    if(oldversion != ef.releasenotes.version){
        if(ef.channels.get(ef.channelsdb.update)){
            if(ef.releasenotes.notify){
                ef.models.send({
                    channel: ef.channelsdb.update,
                    message: `**Version ${ef.releasenotes.version} release notes:**\n\n${ef.releasenotes.notes}`
                })
            }
            ef.db.editDoc({'version': oldversion}, {'version': ef.releasenotes.version}, 'botinfo')
        }
    }
}