const Canvas = require("canvas");
const fs = require("fs");
var frtnt = require("fortnite")
var Fortnite = new frtnt(ef.tokens["fortniteapi"])

async function draw(Platform, Message, Data)
{
    var Stats = Data.stats;
    if(Stats === undefined) throw 'NoUser'

    Stats = await Object.assign({
        solo: {
            kd: 0.0,
            kills: 0,
            kills_per_match: 0.0,
            matches: 0,
            score: 0,
            score_per_match: 0.0,
            top_12: 0,
            top_25: 0,
            top_3: 0,
            top_5: 0,
            top_6: 0,
            wins: 0
        },
        duo: {
            kd: 0.0,
            kills: 0,
            kills_per_match: 0.0,
            matches: 0,
            score: 0,
            score_per_match: 0.0,
            top_12: 0,
            top_25: 0,
            top_3: 0,
            top_5: 0,
            top_6: 0,
            wins: 0
        },
        squad: {
            kd: 0.0,
            kills: 0,
            kills_per_match: 0.0,
            matches: 0,
            score: 0,
            score_per_match: 0.0,
            top_12: 0,
            top_25: 0,
            top_3: 0,
            top_5: 0,
            top_6: 0,
            wins: 0
        },
        lifetime: {
            kd: 0.0,
            kills: 0,
            matches: 0,
            score: 0,
            top_12: 0,
            top_25: 0,
            top_3: 0,
            top_5: 0,
            top_6: 0,
            wins: 0
        },
        recent: []
    }, Stats)

    if(Stats.solo.wins != 0){var winsol = Math.round(Stats.solo.wins / Stats.solo.matches * 10000)/100;}else{var winsol = 0;}
    if(Stats.duo.wins != 0){var winduo = Math.round(Stats.duo.wins / Stats.duo.matches * 10000)/100;}else{var winduo = 0;}
    if(Stats.squad.wins != 0){var winsq = Math.round(Stats.squad.wins / Stats.squad.matches * 10000)/100;}else{var winsq = 0;}
    if(Stats.lifetime["wins"] != 0){var winlt = Math.round(Stats.lifetime["wins"] / Stats.lifetime["matches"] * 10000)/100;}else{var winlt = 0;}

    const canvas = Canvas.createCanvas(600, 360);
    const ctx = canvas.getContext('2d');
    //background
    ctx.fillStyle = '#7289DA';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    //general fields
    ctx.fillStyle = '#76a7f7';
    ctx.fillRect(10, 20, 220, 320);
    ctx.fillRect(240, 20, 350, 100);
    ctx.fillRect(240, 130, 350, 100);
    ctx.fillRect(240, 240, 350, 100);
    //headers
    ctx.fillStyle = '#3a85ff';
    ctx.fillRect(10, 20, 220, 30);
    ctx.fillRect(240, 20, 350, 30);
    ctx.fillRect(240, 130, 350, 30);
    ctx.fillRect(240, 240, 350, 30);
    //General subtitles
    ctx.font = '15px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`Stats Lifetime:`, 15, 40);
    ctx.fillText(`Stats Solo:`, 245, 40);
    ctx.fillText(`Stats Duo:`, 245, 150);
    ctx.fillText(`Stats Squad:`, 245, 260);
    if(Platform == "PlayStation"){ctx.fillText(`${Platform}`, 140, 40);}else if(Platform == "PC"){ctx.fillText(`${Platform}`, 205, 40);}else{ctx.fillText(`${Platform}`, 185, 40);}
    //===Subtitles===
    ctx.fillStyle = '#003387';
    ctx.font = '13px sans-serif';
    //Solo
    ctx.fillText(`K/D`, 265, 105);
    ctx.fillText(`Wins`, 325, 105);
    ctx.fillText(`Kills`, 395, 105);
    ctx.fillText(`Win %`, 455, 105);
    ctx.fillText(`Matches`, 525, 105);
    //duo
    ctx.fillText(`K/D`, 265, 215);
    ctx.fillText(`Wins`, 325, 215);
    ctx.fillText(`Kills`, 395, 215);
    ctx.fillText(`Win %`, 455, 215);
    ctx.fillText(`Matches`, 525, 215);
    //squads
    ctx.fillText(`K/D`, 265, 325);
    ctx.fillText(`Wins`, 325, 325);
    ctx.fillText(`Kills`, 395, 325);
    ctx.fillText(`Win %`, 455, 325);
    ctx.fillText(`Matches`, 525, 325);
    //lifetime
    ctx.textAlign = "center"; 
    ctx.fillText(`Wins`, 45, 150);
    ctx.fillText(`K/D`, 115, 150);
    ctx.fillText(`Win %`, 190, 150);
    //===DATA===
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 19px Courier';
    ctx.textAlign = "center"; 
    //Solo
    ctx.fillText(`${Stats.solo.kd}`, 275, 75);
    ctx.fillText(`${Stats.solo.wins}`, 340, 75);
    ctx.fillText(`${Stats.solo.kills}`, 405, 75);
    ctx.fillText(`${winsol}`, 475, 75);
    ctx.fillText(`${Stats.solo.matches}`, 550, 75);
    //duo
    ctx.fillText(`${Stats.duo.kd}`, 275, 185);
    ctx.fillText(`${Stats.duo.wins}`, 340, 185);
    ctx.fillText(`${Stats.duo.kills}`, 405, 185);
    ctx.fillText(`${winduo}`, 475, 185);
    ctx.fillText(`${Stats.duo.matches}`, 550, 185);
    //squads
    ctx.fillText(`${Stats.squad.kd}`, 275, 295);
    ctx.fillText(`${Stats.squad.wins}`, 340, 295);
    ctx.fillText(`${Stats.squad.kills}`, 405, 295);
    ctx.fillText(`${winsq}`, 475, 295);
    ctx.fillText(`${Stats.squad.matches}`, 550, 295);
    //NICK
    ctx.font = '19px sans-serif';
    ctx.fillText(`${Data.username}`, 120, 80);
    ctx.font = 'bold 19px Courier';
    //lifetime
    ctx.strokeStyle = "#003387";
    ctx.moveTo(20, 100);
    ctx.lineTo(100, 100);
    ctx.stroke();
    ctx.fillText(`${Stats.lifetime["wins"]}`, 45, 130);
    ctx.fillText(`${Stats.lifetime['kd']}`, 115, 130);
    ctx.fillText(`${winlt}`, 190, 130);
    ctx.moveTo(20, 163);
    ctx.lineTo(100, 163);
    ctx.stroke();
    ctx.textAlign = "start"; 
    ctx.fillText(`${Stats.lifetime["kills"]}`, 15, 190);
    ctx.fillText(`${Stats.lifetime["matches"]}`, 15, 225);
    ctx.fillText(`${Stats.lifetime["top_3"]}`, 15, 260);
    ctx.fillText(`${Stats.lifetime["top_5"]}`, 15, 295);
    var posxkill = ctx.measureText(Stats.lifetime["kills"]).width + 10 + 15;
    var posxmatch = ctx.measureText(Stats.lifetime["matches"]).width + 10 + 15;
    var posxtop3 = ctx.measureText(Stats.lifetime["top_3"]).width + 10 + 15;
    var posxtop5 = ctx.measureText(Stats.lifetime["top_5"]).width + 10 + 15;
    ctx.font = '13px sans-serif';
    ctx.fillStyle = '#003387';
    ctx.fillText(`Kills`, posxkill, 190);
    ctx.fillText(`Matches`, posxmatch, 225);
    ctx.fillText(`Top 3s`, posxtop3, 260);
    ctx.fillText(`Top 5s`, posxtop5, 295);
                
    var Out = fs.createWriteStream(`./${Data.username}.png`);
    var Stream = canvas.createPNGStream();
    Stream.pipe(Out);

    Out.on("finish", () =>
    {
        Message.channel.send({ file: `./${Data.username}.png`}).then(() =>
        {
            fs.unlink(`./${Data.username}.png`, () => {});
        });
    });
}

async function check(Username, Message, guild){

    var Platforms = [["pc", "PC"], ["xbl", "Xbox"], ["psn", "PlayStation"]];

    var user = Username.split(' ')

    if(user[0] == '-ps4'){

        user.shift()

        Username = user.join(' ')

        var Platform = Platforms[2][1]

        Fortnite.user(Username, Platforms[2][0]).then(async Data => {
            await draw(Platform, Message, Data)
        })
        .catch(err => {
            if(err == 'NoUser'){
                ef.models.send({
                    object: Message,
                    message: `${ef.emotes.markNo}**${Message.member.displayName}**, nie znaleziono użytkownika. Spróbuj sprawdzić na innych platformach!`,
                    color: ef.colors.red
                })
            }
            else
            {
                require('../../../handlers/error')(Message, guild, err)
            }
        })
    }else if(user[0] == '-xbx'){

        user.shift()

        Username = user.join(' ')

        var Platform = Platforms[1][1]

        Fortnite.user(Username, Platforms[1][0]).then(async Data => {
            await draw(Platform, Message, Data)
        })
        .catch(err => {
            if(err == 'NoUser'){
                ef.models.send({
                    object: Message,
                    message: `${ef.emotes.markNo}**${Message.member.displayName}**, nie znaleziono użytkownika. Spróbuj sprawdzić na innych platformach!`,
                    color: ef.colors.red
                })
            }
            else
            {
                require('../../../handlers/error')(Message, guild, err)
            }
        })
    }else{

        var Platform = Platforms[0][1]

        Fortnite.user(Username, Platforms[0][0]).then(async Data => {
            await draw(Platform, Message, Data)
        })
        .catch(err => {
            if(err == 'NoUser'){
                ef.models.send({
                    object: Message,
                    message: `${ef.emotes.markNo}**${Message.member.displayName}**, nie znaleziono użytkownika. Spróbuj sprawdzić na innych platformach!`,
                    color: ef.colors.red
                })
            }
            else
            {
                require('../../../handlers/error')(Message, guild, err)
            }
        })
    }
}

exports.output = async ({message, guild, args}) => {
    if(args.join(" ") == "-drop"){
        var Places = [
            'Skaliste Skarpy',
            'Kurzące Kominy',
            'Przyjemny Park',
            'Potne Piaski',
            'Słone Strzechy',
            'Farma Furii',
            'Paskudna Przystań',
            'Zielone Żywopłoty',
            'Piszcząca Puszcza',
            'Zalew Zastoju',
            'Sklepowa Sadyba',
            'Siorbane Szuwary',
            'Gasnące Gaje'
        ]

        var picked = Math.floor(Math.random() * Places.length)

        return ef.models.send({
            object: message,
            message: `Oto miejsce gdzie możesz wylądować: **${Places[picked]}**`
        })
    }else if(args[0] == "-link"){

        if(!args[1]) return ef.models.send({
            object: message,
            message: `${ef.emotes.markNo}Podaj poprawną nazwę użytkownika!`,
            color: ef.colors.red
        })

        args.shift()

        var Username = args.join(' ')

        var Accounts = await ef.db.findDoc('fortnite')

        if(Accounts.length != 0){
            var exist = false

            Accounts.forEach(account => {
                if(account.id == message.author.id){
                    ef.db.editDoc({id: `${message.author.id}`}, {'username': `${Username}`}, 'fortnite')
                    exist = true
                }
            })
            if(!exist){
                var data = {
                    id: `${message.author.id}`,
                    tag: `${message.author.tag}`,
                    username: `${Username}`
                }
                ef.db.addDoc(data, 'fortnite')
            }
        } else {
            var data = {
                id: `${message.author.id}`,
                tag: `${message.author.tag}`,
                username: `${Username}`
            }
            ef.db.addDoc(data, 'fortnite')
        }
        return ef.models.send({
            object: message,
            message: `${ef.emotes.markYes}Podłączono Twoje konto!\nUżyj \`${ef.prefix}fn\` aby sprawdzić swoje statystyki.`
        })
    }else if(args[0] == "-unlink"){

        var Accounts = await ef.db.findDoc('fortnite')

        var exist = false

        Accounts.forEach(account => {
            if(account.id == message.author.id){
                ef.db.remDoc({id: message.author.id}, 'fortnite')
                exist = true
            }
        })

        if(exist){
            return ef.models.send({
                object: message,
                message: `${ef.emotes.markYes}Pomyślnie odłączono twoje konto!`
            })
        }else{
            return ef.models.send({
                object: message,
                message: `${ef.emotes.markNo}Twoje konto nie zosało podłączone!`,
                color: ef.colors.red
            })
        }
    }else if(!args[0]){
        
        var Accounts = await ef.db.findDoc('fortnite')

        var exist = false

        var promise = await new Promise((resolve, reject) => {
            Accounts.forEach(async account => {
                if(account.id == message.author.id){
                    await check(account.username, message, guild)
                    exist = true
                    resolve()
                }
            })
        })

        await promise

        if(!exist){
            return ef.models.send({
                object: message,
                message: `${ef.emotes.markNo}Twoje konto nie zosało podłączone!`,
                color: ef.colors.red
            })
        }
    }else{
        await check(args.join(' '), message, guild)
    }
}

exports.data = {
    triggers: ['fortnite', 'fn'],
    description: `Sprawdź statystyki z Fortnite lub wylosuj miejsce do lądowania!`,
    usage: [
        '{prefix}{command} -link [-ps4/-xbx] <Epic Username> - podłącz swoje konto',
        '{prefix}{command} - sprawdź statystyki podłączonego konta',
        '{prefix}{command} [-ps4/-xbx] <Epic Username> - sprawdź statystyki konta',
        '{prefix}{command} -drop - wylosuj miejsce do lądowania',
        '{prefix}{command} -unlink - odłącz konto'
    ],
    disabled: true
}
  