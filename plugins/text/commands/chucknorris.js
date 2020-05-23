exports.output = async ({message}) => {
    ef.models.apibadosz({
        object: message,
        endpoint: 'chucknorris',
        type: 'text',
        output: 'joke'
    })
}
exports.data = {
    triggers: ['chucknorris'],
    description: {
        pl: `Pokazuje żart o Chucku Norrisie. (W języku angielskim)`,
        en: `Shows a joke about Chuck Norris.`,
        ru: `Показывает анекдот про Чака Норриса. (На английском)`
    }
}
  
