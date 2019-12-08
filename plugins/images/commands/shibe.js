exports.output = async ({message}) => {
    ef.models.apibadosz({
      object: message,
      title: ':dog:',
      endpoint: 'shibe'
    })
}
  
exports.data = {
    triggers: ['shibe'],
    description: 'Pokazuje zdjęcie psa rasy Shibe.'
}
  