exports.output = async ({message}) => {
    ef.models.apibadosz({
        object: message,
        title: ':fox:',
        endpoint: 'fox'
    })
}
  
exports.data = {
    triggers: ['fox'],
    description: {
        pl: 'Pokazuje zdjęcie lisa.',
        en: 'Shows fox image.',
        ru: 'Показывает изображение лисы.'
    }
}
  