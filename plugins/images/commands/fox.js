exports.output = async ({message}) => {
    ef.models.apibadosz({
        object: message,
        title: ':fox:',
        endpoint: 'fox'
    })
}
  
exports.data = {
    triggers: ['fox'],
    description: 'Pokazuje zdjęcie lisa.'
}
  