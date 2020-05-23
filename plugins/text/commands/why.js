exports.output = async ({message}) => {
    ef.models.apibadosz({
        object: message,
        endpoint: 'why',
        type: 'text',
        output: 'why'
    })
}
exports.data = {
    triggers: ['why'],
    description: {
        pl: `Pokazuje losowe pytanie w stylu: 'dlaczego?'. (W języku angielskim)`,
        en: 'Why?',
        ru: 'Показывает случайный вопрос типа «почему?» (На английском языке)'
    }
}
  