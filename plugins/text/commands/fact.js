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
    description: {
        pl: 'Pokazuje losowy fakt. (W języku angielskim)',
        en: 'Summons random fact.',
        ru: 'Показывает случайный факт. (На английском языке)'
    }
}
  