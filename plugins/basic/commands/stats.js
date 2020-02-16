exports.output = async ({message}) => {
    ef.models.send({
        object: message,
        message: `Api: \`${Math.floor(ef.ping)}ms.\`
                  Bot: \`${Date.now() - message.createdTimestamp}ms.\`
                  Commands Used: \`${ef.db.cache['botinfo'][0].commandsdone}\``,
    })
}
  
exports.data = {
    triggers: ['stats'],
    description: 'Shows bot stats.'
}