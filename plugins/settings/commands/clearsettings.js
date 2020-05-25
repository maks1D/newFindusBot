exports.output = async ({message, guild, args}) => {
    var translations = {en: [], pl: [], ru: []}

    ef.db.remDoc({id: `${message.guild.id}`}, 'servers')
    translations.pl[0] = `${ef.emotes.markYes}Pomyślnie usunięto dane dla serwera!`
    translations.en[0] = `${ef.emotes.markYes}The server data has been deleted successfully!`
    translations.ru[0] = `${ef.emotes.markYes}Данные сервера были успешно удалены!`
    ef.models.send({
        object: message,
        message: `${translations[guild.settings.language][0]}`
    })
}

exports.data = {
    triggers: ['dataclear', 'delsettings'],
    description: {
        pl: 'Resetuje ustawienia bota na serwerze.',
        en: 'Resets the bot settings on the server.',
        ru: 'Сбрасывает настройки бота на сервере.'
    },
    usage: [
        '{prefix}{command}'     
    ],
    userPerms: [
        "MANAGE_GUILD"
    ]
}