exports.output = async ({message, guild, args}) => {

    var special = false

    if(args.length > 1) {
        if(args[1] === '-DM') {
            special = true
            var usr = ef.users.get(args[2])
            if(usr !== undefined) {
                if(usr.bot !== true) await usr.createDM()
                try {
                    var target = await usr.dmChannel.fetchMessage(`${args[0]}`)
                    target.delete()
                    if(args[3] != '-nolog') {
                        ef.models.send({
                            object: message,
                            message: `Pomyślnie usunięto wiadomość!`
                        })
                    }
                    return
                } catch (e) {}
            }
        } else if(args[1] === '-ID')  {
            special = true
            var channel = ef.channels.get(args[2])
            if(channel !== undefined) {
                try {
                    var target = await channel.fetchMessage(`${args[0]}`)
                    target.delete()
                    if(args[3] != '-nolog') {
                        ef.models.send({
                            object: message,
                            message: `Pomyślnie usunięto wiadomość!`
                        })
                    }
                    return
                } catch (e) {}
            }
        }
    } 
    
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
            if(args[special ? 3 : 1] != '-nolog'){
                ef.models.send({
                    object: message,
                    color: ef.colors.red,
                    message: `Nie znaleziono wiadomości!`
                })
            }
        } else {
            answer.delete()
            if(args[special ? 3 : 1] != '-nolog') {
                ef.models.send({
                    object: message,
                    message: `Pomyślnie usunięto wiadomość!`
                })
            }
        }
    } else {
        targt.delete()
        if(args[special === true ? 3 : 1] != '-nolog') {
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
        '{prefix}{command} <ID wiadomości> [-nolog]',
        '{prefix}{command} <ID wiadomości> <-DM / -ID> <user ID / channel ID> [-nolog]'
    ],
    developer: true
}