const fs = require('fs')

module.exports = async () => {
  ef.plugins = []
  const plugins = fs.readdirSync(`${__dirname}/../plugins`)

  for (const pluginPath of plugins) {
    const plugin = require(`../plugins/${pluginPath}`)
    ef.plugins.push(plugin)
  }
  
 console.log(`Loaded ${ef.plugins.length} plugins.`)
}
