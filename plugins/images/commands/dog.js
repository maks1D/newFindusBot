exports.output = async ({message}) => {
    ef.models.apibadosz({
        object: message,
        title: ':dog:',
        endpoint: 'dog'
    })
}
  
exports.data = {
    triggers: ['dog'],
    description: {
        pl: 'Pokazuje losowe zdjęcie psa.',
        en: 'Shows random dog image.',
        ru: 'Показывает случайное изображение собаки.'
    }
}
  