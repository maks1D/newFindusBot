exports.init = async function init() {
    ef.db.editDoc({version: `${ef.releasenotes.version}`}, {commandsdone: ef.db.cache['botinfo'][0].commandsdone}, 'botinfo')
    setTimeout(init, 60000)
}