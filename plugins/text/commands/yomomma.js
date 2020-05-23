exports.output = async ({message}) => {
    ef.models.apibadosz({
        object: message,
        endpoint: 'yomomma',
        type: 'text',
        output: 'joke'
    })
}
exports.data = {
    triggers: ['yomomma'],
    description: {
        pl: `Pokazuje losowy żart o 'twojej starej'. (W języku angielskim)`,
        en: 'Summons yomomma joke.',
        ru: 'Показывает случайную шутку про "твою старую". (На английском)'
    }
}
  
