exports.output = async ({message}) => {
    ef.models.apibadosz({
        object: message,
        title: ':bird:',
        endpoint: 'bird'
    })
}
  
exports.data = {
    triggers: ['bird'],
    description: {
        pl: 'Pokazuje losowy obraz ptaka.',
        en: 'Shows random bird image.',
        ru: 'Показывает случайное изображение птицы.'
    }
}
  