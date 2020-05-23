exports.output = async ({message}) => {
    ef.models.apibadosz({
        object: message,
        endpoint: 'advice',
        type: 'text',
        output: 'advice'
    })
}
exports.data = {
    triggers: ['advice'],
    description: {
        pl: `Pokazuje poradę. (W języku angielskim)`,
        en: 'Summons advice.',
        ru: 'Призывает совет. (На английском)'
    }
}
