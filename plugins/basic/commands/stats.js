exports.output = async ({message}) => {
    ef.models.send({
        object: message,
        message: `Api: \`${Math.floor(ef.ping)}ms.\`
                  Bot: \`${Date.now() - message.createdTimestamp}ms.\``,
    })
}
  
exports.data = {
    triggers: ['ping'],
    description: 'Shows bot ping.'
}