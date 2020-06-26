module.exports = async (message, guild) => {
    var translations = {en: `Hi! I'm ***${ef.user.username}!***\nType **${ef.prefix}help** for help!\nCome to my [server](https://discord.gg/SgKzpgY)!\nInvite me [here](https://discord.com/api/oauth2/authorize?client_id=538655104664862721&permissions=8&scope=bot)!`, 
                        pl: `Cześć! Jestem ***${ef.user.username}!***\nWpisz **${ef.prefix}help** aby uzyskać pomoc!\nWbij na mój [serwer](https://discord.gg/SgKzpgY)!\nZaproś bota [tutaj](https://discord.com/api/oauth2/authorize?client_id=538655104664862721&permissions=8&scope=bot)!`, 
                        ru: `Здравствуй! Я ***${ef.user.username}!***\nНапишите **${ef.prefix}help** для помощи!\nЗаходите на мой [сервер](https://discord.gg/SgKzpgY)!\nInvite me [here](https://discord.com/api/oauth2/authorize?client_id=538655104664862721&permissions=8&scope=bot)!`}
    ef.models.send({
        object: message,
        message: `${translations[guild.settings.language]}`,
        thumbnail: ef.user.displayAvatarURL,
        color: ef.colors.aqua
    })
}