exports.output = async ({message}) => {
    ef.models.apibadosz({
        object: message,
        title: ':dog:',
        endpoint: 'dog'
    })
}
  
exports.data = {
    triggers: ['dog'],
    description: 'Pokazuje zdjęcie psa.'
}
  