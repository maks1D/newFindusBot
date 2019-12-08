exports.output = async ({message}) => {
    ef.models.apibadosz({
        object: message,
        endpoint: 'fact',
        type: 'text',
        output: 'fact'
    })
}
exports.data = {
    triggers: ['fact'],
    description: 'Pokazuje losowy fakt. (W języku angielskim)'
}
  