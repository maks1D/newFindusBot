const commands = require('fs').readdirSync(`${__dirname}/commands/`)
  .filter(file => file !== 'index.js' && file.split('.')[1] == "js")
  .map(file => require(`${__dirname}/commands/${file}`))

module.exports = {
  name: ':tada: Teksty',
  id: 'text',
  description: 'Zbiór rzeczy różnych.',
  author: 'Findus#7449',
  commands: commands,
  devOnly: false,
  hiddenInHelp: false
}
