exports.output = async ({message}) => {
  ef.models.apibadosz({
    object: message,
    title: ':dog:',
    endpoint: 'shibe'
  })
}
  
exports.data = {
  triggers: ['shibe'],
  description: {
    pl: 'Pokazuje zdjęcie psa rasy Shibe.',
    en: 'Shows random shibe image.',
    ru: 'Показывает фотографию собаки Шиба.'
  }
}
  