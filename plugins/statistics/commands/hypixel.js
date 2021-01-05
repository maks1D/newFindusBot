const baseURL = "https://gen.plancke.io/exp/";
const fs = require("fs");
var translations = {en: [], pl: [], ru: []}

async function send(user, message, guild)  {
    const response = await ef.http.get(`${baseURL}${user}.png`)
    fs.writeFileSync(`${__dirname}/${user}.png`, response.body)
    var data = fs.readFileSync(`${__dirname}/${user}.png`, 'utf8')
    if(data == "ensure==BadPlayerException"){
        translations.pl[0] = `${ef.emotes.markNo}Użytkownik nie istnieje!`
        translations.en[0] = `${ef.emotes.markNo}User does not exist!`
        translations.ru[0] = `${ef.emotes.markNo}Пользователь не существует!`
        ef.models.send({
            object: message,
            message: `${translations[guild.settings.language][0]}`,
            color: ef.colors.red
        })
    } else {
        translations.pl[0] = `Statystyki dla ${user}`
        translations.en[0] = `Stats for ${user}`
        translations.ru[0] = `Статистика для ${user}`
        await ef.models.send({
            object: message,
            message: ``,
            image: `attachment://${user}.png`,
            footer: `${translations[guild.settings.language][0]}`
        })
    }
    fs.unlinkSync(`${__dirname}/${user}.png`, (err) => {if(err != null) throw err})
}

exports.output = async ({message, guild, args}) => {
    var user = args.join(' ');
    translations.pl[0] = `${ef.emotes.markNo}Podaj poprawną nazwę użytkownika!`
    translations.en[0] = `${ef.emotes.markNo}Please enter a valid username!`
    translations.ru[0] = `${ef.emotes.markNo}Пожалуйста введите действительное имя пользователя!`
    if(/[^a-z0-9_]/i.test(user)) return ef.models.send({object: message, message: `${translations[guild.settings.language][0]}`, color: ef.colors.red})
    send(user, message, guild);
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