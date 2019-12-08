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
    description: `Pokazuje pytanie w stylu: 'dlaczego?'. (W języku angielskim)`
}
  