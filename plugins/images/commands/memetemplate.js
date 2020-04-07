exports.output = async ({message}) => {
    var api = await ef.http.get('https://api.imgflip.com/get_memes')
    var meme = api.body.data.memes[Math.floor(Math.random() * (api.body.data.memes.length - 1))]

    ef.models.send({
        object: message,
        message: meme.name,
        image: meme.url
    })
}
  
exports.data = {
    triggers: ['memetemplate'],
    description: {
        pl: 'Pokazuje losowy szablon memów.',
        en: 'Shows random meme template.',
        ru: 'Показывает случайный шаблон мема.'
    }
}
  