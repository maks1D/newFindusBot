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
    description: `Pokazuje losowy żart o 'twojej starej'. (W języku angielskim)`
}
  
