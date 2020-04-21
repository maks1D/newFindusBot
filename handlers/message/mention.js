module.exports = async (message, guild) => {
    var translations = {en: `Hi! I'm ***${ef.user.username}!***\nType **${ef.prefix}help** for help!\nCome to my [server](https://discord.gg/SgKzpgY)!`, 
                        pl: `Cześć! Jestem ***${ef.user.username}!***\nWpisz **${ef.prefix}help** aby uzyskać pomoc!\nWbij na mój [serwer](https://discord.gg/SgKzpgY)!`, 
                        ru: `Здравствуй! Я ***${ef.user.username}!***\nНапишите **${ef.prefix}help** для помощи!\nЗаходите на мой [сервер](https://discord.gg/SgKzpgY)!`}
    ef.models.send({
        object: message,
        message: `${translations[guild.settings.language]}`,
        thumbnail: ef.user.displayAvatarURL,
        color: ef.colors.aqua
    })
}