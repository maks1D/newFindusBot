exports.output = async ({message}) => {
    ef.models.apibadosz({
        object: message,
        endpoint: 'cat',
        type: 'text',
        output: 'cat'
    })
}
exports.data = {
    triggers: ['catface'],
    description: {
        pl: 'Pokazuje kocią twarz z ASCII artu.',
        en: 'Shows ASCII art cat face.',
        ru: 'Показывает лицо кота от ASCII art.'
    }
}
  