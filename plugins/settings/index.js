const commands = require('fs').readdirSync(`${__dirname}/commands/`)
  .filter(file => file !== 'index.js' && file.split('.')[1] == "js")
  .map(file => require(`${__dirname}/commands/${file}`))

module.exports = {
  name: {
    pl: ':gear: Ustawienia',
    en: ':gear: Settings',
    ru: ':gear: настройки'
  },
  id: 'settings',
  description: {
    pl: 'Spersonalizuj ustawienia bota na serwerze!',
    en: 'Personalize bot settings on the server!',
    ru: 'Персонализируйте настройки бота на сервере!'
  },
  author: 'Findus#7449',
  commands: commands,
  devOnly: false,
  hiddenInHelp: false
}
