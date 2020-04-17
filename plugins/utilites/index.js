const commands = require('fs').readdirSync(`${__dirname}/commands/`)
    .filter(file => file !== 'index.js' && file.split('.')[1] == "js")
    .map(file => require(`${__dirname}/commands/${file}`))

module.exports = {
    name: {
        pl: ':wrench: Narzędzia',
        en: ':wrench: Utilites',
        ru: ':wrench: коммунальные услуги'
    },
    id: 'utils',
    description: {
        pl: 'Użyteczne narzędzia.',
        en: 'Useful tools.',
        ru: 'полезные инструменты.'
    },
    author: 'Findus#7449',
    commands: commands,
    devOnly: false,
    hiddenInHelp: false
}
