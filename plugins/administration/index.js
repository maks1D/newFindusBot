const commands = require('fs').readdirSync(`${__dirname}/commands/`)
  .filter(file => file !== 'index.js' && file.split('.')[1] == "js")
  .map(file => require(`${__dirname}/commands/${file}`))

module.exports = {
  name: {en: ':hammer_pick: Administration', pl: ':hammer_pick: Administracja', ru: ':hammer_pick: администрация'},
  id: 'admin',
  description: {pl: 'Wymierzaj sprawiedliwość i pilnuj porządku!', en: 'Do justice and keep order!', ru: 'Делай справедливость и следи за порядком!'},
  author: 'Findus#7449',
  commands: commands,
  devOnly: false,
  hiddenInHelp: false
}