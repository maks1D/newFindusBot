exports.output = async ({message, guild}) => {
    var translations = {pl: ``, en: ``, ru: ``}
    translations.pl = 
`**Aktualna wersja:** \`${ef.releasenotes.version}\`
**Nowości:** \n${ef.releasenotes.notes}
**Zaproś bota** [tutaj](https://discord.com/api/oauth2/authorize?client_id=538655104664862721&permissions=8&scope=bot).`
    translations.en = 
`**Current version:** \`${ef.releasenotes.version}\`
**Release notes:** \n${ef.releasenotes.notes}
**Invite me** [here](https://discord.com/api/oauth2/authorize?client_id=538655104664862721&permissions=8&scope=bot).`
    translations.ru = translations.en
    ef.models.send({
        object: message,
        message: `${translations[guild.settings.language]}`,
        thumbnail: ef.user.displayAvatarURL,
        color: ef.colors.aqua
    })
}
  
exports.data = {
    triggers: ['binfo'],
    description: {en: 'Shows info about bot.', pl: 'Pokazuje informacje o bocie.', ru: 'Shows info about bot.'}
}