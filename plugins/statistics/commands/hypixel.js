const baseURL = "https://gen.plancke.io/exp/";
const fs = require("fs");

async function send(user, message)  {
    const response = await ef.http.get(`${baseURL}${user}.png`)
    fs.writeFileSync(`${__dirname}/trash.txt`, response.body)
    var data = fs.readFileSync(`${__dirname}/trash.txt`, 'utf8')
    if(data == "ensure==BadPlayerException"){ef.models.send({object: message, message: `Użytkownik nie istnieje!`, color: ef.colors.red})}
    else {
        ef.models.send({
            object: message,
            message: ``,
            image: `${baseURL}${user}.png`,
            footer: `Stats for ${user}`
        })
    }
  
    fs.unlinkSync(`${__dirname}/trash.txt`, (err) => {if(err != null) throw err})
}

exports.output = async ({message, guild, args}) => {
    var user = args.join(' ');
    if(/[^a-z0-9_]/i.test(user)) return ef.models.send({object: message, message: `Podaj poprawną nazwę użytkownika!`, color: ef.colors.red})
    send(user, message);
}

exports.data = {
    triggers: ['hypixelstats', 'hystat'],
    description: 'Pokazuje poziom z serwera Hypixel w Minecraft.',
    usage: [
        '{prefix}{command} <nazwa użytkownika w Minecraft>'     
    ],
    args: [
        {
            type: 'text',
            name: 'nazwa użytkownika w Minecraft'
        }
    ]
}
  