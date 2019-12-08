const commands = require('fs').readdirSync(`${__dirname}/commands/`)
  .filter(file => file !== 'index.js' && file.split('.')[1] == "js")
  .map(file => require(`${__dirname}/commands/${file}`))

module.exports = {
  name: ':robot: Bot management',
  id: 'dev',
  description: 'Zarządzaj botem.',
  author: 'Findus#7449',
  commands: commands,
  devOnly: true,
  hiddenInHelp: true
}