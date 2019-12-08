exports.output = async ({message}) => {
    const max = await ef.http.get('https://xkcd.com/info.0.json')
    const res = await ef.http.get(`https://xkcd.com/${Math.floor(Math.random() * max.body.num + 1)}/info.0.json`)
    ef.models.send({
        object: message,
        message: res.body.alt,
        image: res.body.img
    })
}
  
exports.data = {
    triggers: ['xkcd'],
    description: 'Pokazuje zdjęcie z komiksu xkcd.'
}
  