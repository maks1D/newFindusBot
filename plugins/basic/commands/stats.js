exports.output = async ({message}) => {
    var translations = {pl: ``, en: ``, ru: ``}
    translations.pl = 
`Ping api: \`${Math.floor(ef.ping)}ms.\`
Ping bota: \`${Date.now() - message.createdTimestamp}ms.\`
Wykonane komendy: \`${ef.db.cache['botinfo'][0].commandsdone}\``
    translations.en = 
`Api ping: \`${Math.floor(ef.ping)}ms.\`
Bot ping: \`${Date.now() - message.createdTimestamp}ms.\`
Commands Used: \`${ef.db.cache['botinfo'][0].commandsdone}\``
    translations.ru =
`API-пинг: \`${Math.floor(ef.ping)}ms.\`
бот пинг: \`${Date.now() - message.createdTimestamp}ms.\`
Используемые команды: \`${ef.db.cache['botinfo'][0].commandsdone}\``
    ef.models.send({
        object: message,
        message: ``,
    })
}
  
exports.data = {
    triggers: ['stats'],
    description: {en: 'Shows bot stats.', pl: 'Pokazuje statystyki bota.', ru: 'Показывает статистику ботов.'}
}