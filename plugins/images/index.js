const commands = require('fs').readdirSync(`${__dirname}/commands/`)
  .filter(file => file !== 'index.js' && file.split('.')[1] == "js")
  .map(file => require(`${__dirname}/commands/${file}`))

module.exports = {
  name: {
    pl: ':frame_photo: Zdjęcia',
    en: ':frame_photo: Images',
    ru: ':frame_photo: Изображений'
  },
  id: 'images',
  description: {
    pl: 'Różne generatory obrazków.',
    en: 'Get requested images from the internet or generate new!',
    ru: 'Получите запрошенные изображения из Интернета или создайте новое!'
  },
  author: 'Findus#7449',
  commands: commands,
  devOnly: false,
  hiddenInHelp: false
}
