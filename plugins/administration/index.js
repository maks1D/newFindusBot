const commands = require('fs').readdirSync(`${__dirname}/commands/`)
  .filter(file => file !== 'index.js' && file.split('.')[1] == "js")
  .map(file => require(`${__dirname}/commands/${file}`))

module.exports = {
  name: ':hammer_pick: Administration',
  id: 'admin',
  description: 'Wymierzaj sprawiedliwość i pilnuj porządku!',
  author: 'Findus#7449',
  commands: commands,
  devOnly: false,
  hiddenInHelp: false
}