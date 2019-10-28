module.exports = async (guild) => {
    ef.db.remDoc({id: guild.id}, 'servers')
}
