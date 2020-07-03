exports.output = async ({message, guild, args}) => {
    var commands = {
        normal: [],
        count: 0
    }

    await ef.plugins.forEach(plugin => {
        if (plugin.id !== 'dev' || args[0] === '-showdev') {
            for(const command of plugin.commands){
                commands.normal.push(`\`${command.data.triggers[0]}\``)
                commands.count ++
            }
        }
    })
    var mess = `:newspaper: **Lista wszystkich komend:**\n\n`
    mess += commands.normal.join(', ')
    mess += `\n\n**Ilość komend:** \`${commands.count}\`.`
    ef.models.send({
        object: message,
        message: mess
    })
}
  
exports.data = {
    triggers: ['allcmds'],
    description: 'Lista wszystkich komend.',
    usage: [
        '{prefix}{command} [-showdev]'
    ],
    developer: true
}