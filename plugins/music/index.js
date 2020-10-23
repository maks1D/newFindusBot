const commands = require('fs').readdirSync(`${__dirname}/commands/`)
  .filter(file => file !== 'index.js' && file.split('.')[1] == "js")
  .map(file => require(`${__dirname}/commands/${file}`))

module.exports = {
  name: {
    pl: ':musical_note: Muzyka',
    en: ':musical_note: Music',
    ru: ':musical_note: Музыка'
  },
  id: 'music',
  description: {
    pl: 'Muzyka.',
    en: 'Music.',
    ru: 'Музыка.'
  },
  author: 'Findus#7449',
  commands: commands,
  devOnly: true,
  hiddenInHelp: true
}
