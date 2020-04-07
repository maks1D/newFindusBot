exports.output = async ({message, args}) => {
    ef.models.apibadosz({
        object: message,
        endpoint: `kiss`
    })
}

exports.data = {
    triggers: ['kiss'],
    description: {
        pl: 'Pocałunek.',
        en: 'Kiss.',
        ru: 'Поцелуй.'
    }
}

