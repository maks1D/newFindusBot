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
    description: `Pokazuje poradę. (W języku angielskim)`
}
