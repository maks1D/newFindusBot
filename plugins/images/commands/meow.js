exports.output = async ({message}) => {
    const api = await ef.http.get('http://aws.random.cat/meow')
  
    ef.models.send({
        object: message,
        message: `:cat:`,
        image: api.body.file
    })
}
  
exports.data = {
    triggers: ['meow'],
    description: {
        pl: 'Pokazuje losowe zdjęcie kota.',
        en: 'Shows random cat image.',
        ru: 'Показывает случайное изображение кошки.'
    }
}
  