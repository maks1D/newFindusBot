exports.output = async ({message}) => {
    ef.models.apibadosz({
        object: message,
        title: ':bird:',
        endpoint: 'bird'
    })
}
  
exports.data = {
    triggers: ['bird'],
    description: 'Pokazuje zdjęcie ptaka.'
}
  