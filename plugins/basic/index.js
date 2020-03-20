const commands = require('fs').readdirSync(`${__dirname}/commands/`)
  .filter(file => file !== 'index.js' && file.split('.')[1] == "js")
  .map(file => require(`${__dirname}/commands/${file}`))

module.exports = {
  name: {en: ':bookmark: Basic', pl: ':bookmark: Podstawowe', ru: ':bookmark: основной'},
  id: 'basic',
  description: {pl: 'Podstawowe informacje o bocie.', en: 'Basic info about bot.', ru: 'Основная информация о боте.'},
  author: 'Findus#7449',
  commands: commands,
  devOnly: false,
  hiddenInHelp: false
}
