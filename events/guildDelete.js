module.exports = async (guild) => {
    ef.db.remDoc({id: guild.id}, 'servers')
    var data = await ef.db.findDoc('applydata')
    for(var i = 0; i < data.length; i++) {
        if(data[i].guildid == guild.id) ef.db.remDoc({guildid: guild.id}, 'applydata')
    }
}
