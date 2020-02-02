exports.output = async ({message, guild, args}) => {

    var res = new Promise((resolve, reject) => {
        var target, ecount = 0
        ef.channels.forEach(async (channel, index, array) => {
            try{
                if(channel.type == 'text') {
                    target = await channel.fetchMessage(`${args[0]}`)
                    resolve(target)
                } else {
                    ecount++
                }
            }catch(e){
                ecount++
                if(ecount == ef.channels.size) {
                    resolve('noMessage')
                } 
            }
        })
    })

    var targt = await res
    
    if(targt == 'noMessage') {
        await new Promise((resolve, reject) => {
            ef.guilds.forEach(async (guild, index, array) => {
                await guild.fetchMembers()
                if(index == array.lastKey()) resolve()
            })
        })

        var result = new Promise((resolve, reject) => {
            var target, ecount = 0
            ef.users.forEach(async (user, index, array) => {
                if(user.bot === false) await user.createDM()
                try{
                    target = await user.dmChannel.fetchMessage(`${args[0]}`)
                    resolve(target)
                }catch(e){
                    ecount++
                    if(ecount == ef.users.size) {
                        resolve('noMessage')
                    } 
                }
            })
        })

        var answer = await result

        if(answer == 'noMessage') {
            if(args[1] != '-nolog'){
                ef.models.send({
                    object: message,
                    color: ef.colors.red,
                    message: `Nie znaleziono wiadomości!`
                })
            }
        } else {
            answer.delete()
            if(args[1] != '-nolog') {
                ef.models.send({
                    object: message,
                    message: `Pomyślnie usunięto wiadomość!`
                })
            }
        }
    } else {
        targt.delete()
        if(args[1] != '-nolog') {
            ef.models.send({
                object: message,
                message: `Pomyślnie usunięto wiadomość!`
            })
        }
    }
}

exports.data = {
    triggers: ['deletemsg', 'del'],
    description: 'Usuwa wiadomość.',
    usage: [
        '{prefix}{command} <ID wiadomości> [-nolog]'
    ],
    developer: true
}