exports.output = async ({message}) => {
    ef.models.apibadosz({
        object: message,
        endpoint: 'cat',
        type: 'text',
        output: 'cat'
    })
}
exports.data = {
    triggers: ['catface'],
    description: 'Pokazuje losową twarz kota z ASCII art.'
}
  