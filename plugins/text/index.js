const commands = require('fs').readdirSync(`${__dirname}/commands/`)
  .filter(file => file !== 'index.js' && file.split('.')[1] == "js")
  .map(file => require(`${__dirname}/commands/${file}`))

module.exports = {
  name: {
    pl: ':newspaper: Teksty',
    en: ':newspaper: Texts',
    ru: ':newspaper: тексты'
  },
  id: 'text',
  description: {
    pl: 'Różne generatory tekstów.',
    en: 'Different text generators.',
    ru: 'Разные генераторы текста.'
  },
  author: 'Findus#7449',
  commands: commands,
  devOnly: false,
  hiddenInHelp: false
}
