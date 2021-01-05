const { Attachment } = require('discord.js')

const baseURL = "https://gen.plancke.io/exp/";
var translations = {en: [], pl: [], ru: []}

exports.output = async ({message, guild, args}) => {
    var user = args.join(' ');
    translations.pl[0] = `${ef.emotes.markNo}Podaj poprawną nazwę użytkownika!`
    translations.en[0] = `${ef.emotes.markNo}Please enter a valid username!`
    translations.ru[0] = `${ef.emotes.markNo}Пожалуйста введите действительное имя пользователя!`
    if(/[^a-z0-9_]/i.test(user)) return ef.models.send({object: message, message: `${translations[guild.settings.language][0]}`, color: ef.colors.red})
    
    const response = await ef.http.get(`${baseURL}${user}.png`);

    if(Buffer.from(response.body).toString('utf8') == "ensure==BadPlayerException"){
        translations.pl[0] = `${ef.emotes.markNo}Użytkownik nie istnieje!`
        translations.en[0] = `${ef.emotes.markNo}User does not exist!`
        translations.ru[0] = `${ef.emotes.markNo}Пользователь не существует!`
        ef.models.send({
            object: message,
            message: `${translations[guild.settings.language][0]}`,
            color: ef.colors.red
        })
    } else {
        const file = new Attachment(response.body, `${user}.png`)
        
        translations.pl[0] = `Statystyki dla ${user}`
        translations.en[0] = `Stats for ${user}`
        translations.ru[0] = `Статистика для ${user}`
        
        await ef.models.send({
            object: message,
            message: ``,
            file: file,
            image: `attachment://${user}.png`,
            footer: `${translations[guild.settings.language][0]}`
        })
    }
}

exports.data = {
    triggers: ['hypixelstats', 'hystat'],
    description: {
        pl: 'Pokazuje poziom doświadczenia z serwera Hypixel w Minecraft.',
        en: 'Shows the level of experience from the Hypixel server in Minecraft.',
        ru: 'Показывает уровень опыта работы с сервером Hypixel в Minecraft.'
    },
    usage: {
        pl: [
            '{prefix}{command} <nazwa użytkownika w Minecraft>'
        ],
        en: [
            '{prefix}{command} <Minecraft username>'
        ],
        ru: [
            '{prefix}{command} <Имя пользователя Minecraft>'
        ]
    },
    args: {
        pl: [
            {
                type: 'text',
                name: 'nazwa użytkownika w Minecraft'
            }
        ],
        en: [
            {
                type: 'text',
                name: 'Minecraft username'
            }
        ],
        ru: [
            {
                type: 'text',
                name: 'Имя пользователя Minecraft'
            }
        ]
    }
}