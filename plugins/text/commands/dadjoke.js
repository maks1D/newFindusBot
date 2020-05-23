exports.output = async ({message}) => {
    ef.models.apibadosz({
        object: message,
        endpoint: 'dadjoke',
        type: 'text',
        output: 'joke'
    })
}
exports.data = {
    triggers: ['dadjoke'],
    description: {
        pl: `Pokazuje żart 'taty'. (W języku angielskim)`,
        en: `Summons dadjoke.`,
        ru: `Призывает Даджиоке. (На английском)`
    }
}
  
