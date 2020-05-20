const commands = require('fs').readdirSync(`${__dirname}/commands/`)
  .filter(file => file !== 'index.js' && file.split('.')[1] == "js")
  .map(file => require(`${__dirname}/commands/${file}`))

module.exports = {
  name: {
    pl: ':video_game: Statystyki',
    en: ':video_game: Statistics',
    ru: ':video_game: Статистика'
  },
  id: 'stats',
  description: {
    pl: 'Spawdź swoje statystyki!',
    en: 'Check your stats!',
    ru: 'Проверьте свою статистику!'
  },
  author: 'Findus#7449',
  commands: commands,
  devOnly: false,
  hiddenInHelp: false
}
