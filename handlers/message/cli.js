const AsciiTable = require('ascii-table')

function send(tabl, message) {
    var tab = tabl.toString()
    tab = tab.split('\n')
    var mess = ''
    var last = ''
    for(var x = 0; x < tab.length; x++) {
        mess += tab[x] + '\n'
        if(mess.length > 2000 - 13) {
            message.channel.send(`\`\`\`css\n${last}\n\`\`\``)
            mess = tab[x] + '\n'
            last = mess
        } else if (x + 1 == tab.length) {
            message.channel.send(`\`\`\`css\n${mess}\n\`\`\``)
        }
        last = mess
    }
}

async function countUsr() {
    var user = {}
    var res = new Promise((resolve, reject) => {
        ef.guilds.forEach(async (guild, index, array) => {
            await guild.fetchMembers()
            guild.members.forEach(member => {
                user[member.user.id] = {
                    tag: member.user.tag,
                    id: member.user.id
                }
            })
            if(index == array.lastKey()) resolve(user)
        })
    })
    var users = await res
    var count = 0
    for(var mem in users) {
        count++
    }
    return count
}

module.exports = async (message) => {
    const tokens = message.content.split(' ')
    let stored = {}
    for (let i = 1; i < tokens.length; i++) {

        if (tokens[i] == 'guild') {
            i++
            
            stored.guild = await ef.guilds.get(tokens[i].replace('self', message.guild.id))
            var dbguilds = await ef.db.findDoc('servers')

            if(stored.guild === undefined) {
                return ef.models.send({
                    object: message,
                    color: ef.colors.red,
                    message: `${ef.emotes.markNo}Niepoprawne id serwera!`
                })
            }
            
            for(var x = 0; x < dbguilds.length; x++) {
                if(dbguilds[x].id == stored.guild.id) {stored.db = dbguilds[x]; break}
            }
            i++
            if (tokens[i] == 'print') {
                const table = new AsciiTable(stored.guild.id)
                .addRow('Owner', `${stored.guild.ownerID} - ${ef.users.get(stored.guild.ownerID).tag}`)
                .addRow('Name', stored.guild.name)
                .addRow('Region', stored.guild.region)
                .addRow('Joined at', await stored.guild.members.get(ef.user.id).joinedAt.toUTCString())
                .addRow('Custom Prefix', stored.db.settings.prefix == ef.prefix ? '[not set]' : stored.db.settings.prefix)
                .addRow('Members', stored.guild.members.filter(m => !m.user.bot).size.toString())
                .addRow('Bots', stored.guild.members.filter(m => m.user.bot).size.toString())
                .addRow('Bot Farm', Math.round(stored.guild.members.filter(m => m.user.bot).size/stored.guild.members.size*100).toString() + "%")
                message.channel.send(`\`\`\`css\n${table.toString()}\n\`\`\``)
            }else if(tokens[i] == 'channels') {
                const table = new AsciiTable(`${stored.guild.id}`)
                .addRow('Name', stored.guild.name)
                var categories = {}
                categories.null = []
                var categs = []
                stored.guild.channels.forEach(channel => {
                    if(channel.type == 'category') {
                        categories[channel.id] = []
                        categs.push(channel)
                    }
                })
                stored.guild.channels.forEach(channel => {
                    if(channel.parentID !== undefined && channel.type != 'category') {
                        categories[channel.parentID].push(channel)
                    } else if (channel.parentID === undefined && channel.type != 'category') {
                        categories.null.push(channel)
                    }
                })
                categories.null = categories.null.sort(function(a, b){return a.position - b.position})
                categories.null.forEach(channel => {
                    table.addRow(channel.type, `${channel.name} - ${channel.id}`)
                })
                categs = categs.sort(function(a, b){return a.position - b.position})
                categs.forEach(category => {
                    table.addRow('category', `${category.name}: - ${category.id}`)
                    categories[category.id] = categories[category.id].sort(function(a, b){return a.position - b.position})
                    categories[category.id].forEach(channel => {
                        table.addRow(channel.type, `  ${channel.name} - ${channel.id}`)
                    })
                })
                send(table, message)
            }else if(tokens[i] == 'members') {
                const table = new AsciiTable(`${stored.guild.id}`)
                .addRow('Name', stored.guild.name)
                stored.guild.members.forEach(member => {
                    table.addRow(`${member.user.bot ? 'BOT' : 'USER'}`, `${member.user.username}#${member.user.discriminator} - ${member.user.id}`)
                });
                send(table, message)
            }else if(tokens[i] == 'roles') {
                const table = new AsciiTable(`${stored.guild.id}`)
                .addRow('Name', stored.guild.name)
                var roles = []
                stored.guild.roles.forEach(role => {roles.push(role)});
                roles = roles.sort(function(a, b){return a.position - b.position})
                roles.forEach(role => {
                    table.addRow(role.name, `${role.id}; Perms: ${role.permissions}`)
                });
                send(table, message)
            }else if(tokens[i] == 'delete'){
                ef.db.remDoc({id: `${stored.guild.id}`}, 'servers')
                ef.models.send({
                    object: message,
                    message: `${ef.emotes.markYes}Pomyślnie usunięto dane dla serwera **${stored.guild.name}**!`
                })
            }else if(tokens[i] == 'queue') {
                var data = ef.queue[stored.guild.id]
                if(data === undefined) return ef.models.send({
                    object: message,
                    color: ef.colors.red,
                    message: `${ef.emotes.markNo}Nic nie jest aktualnie odtwarzane!`
                })
                var queue = []
                for(var a in data.queue) {
                    queue.push(data.queue[a].url.replace("https:\/\/youtube.com\/watch?v=", ''))
                }
                const table = new AsciiTable(`${stored.guild.id} - QUEUE`)
                .addRow('Name', stored.guild.name)
                .addRow('nowPlaying', `ID: ${data.nowPlaying.url.replace("https:\/\/youtube.com\/watch?v=", '')}`)
                .addRow('queue', `${queue.join('; ')}`)
                .addRow('volume', `${data.volume}`)
                .addRow('autoleave', `${data.autoleave ? 'True' : 'False'}`)
                send(table, message)
            }
        }
        if(tokens[i] == 'user'){
            i++
            stored.user = await ef.users.get(tokens[i].replace('self', message.author.id))
            if(stored.user === undefined) {
                return ef.models.send({
                    object: message,
                    color: ef.colors.red,
                    message: `${ef.emotes.markNo}Niepoprawne id użytkownika!`
                })
            }
            i++
            if(tokens[i] == 'print') {
                const table = new AsciiTable(stored.user.id)
                .addRow('Name', stored.user.tag)
                .addRow('Bot', stored.user.bot ? 'Yes' : 'No')
                .addRow('Created At', stored.user.createdAt.toUTCString())
                .addRow('Status', stored.user.presence.status.replace(/online/g, `Online`).replace(/idle/g, `Idle`).replace(/dnd/g, `Dnd`).replace(/offline/g, `Offline`))
                .addRow("In", stored.user.presence.game ? `${stored.user.presence.game.name}` : "Nothing")
                message.channel.send(`\`\`\`css\n${table.toString()}\n\`\`\``)
            }else{
                var guild = await ef.guilds.get(tokens[i])
                if(guild !== undefined) {
                    var usr = await guild.members.get(stored.user.id)
                    var prms = usr.permissions.bitfield
                    var rols = usr.roles
                    if(prms === undefined) return
                    const table = new AsciiTable(stored.user.id)
                    .addRow('Name', stored.user.tag)
                    .addRow('Bot', stored.user.bot ? 'Yes' : 'No')
                    .addRow('Created At', stored.user.createdAt.toUTCString())
                    .addRow('Status', stored.user.presence.status.replace(/online/g, `Online`).replace(/idle/g, `Idle`).replace(/dnd/g, `Dnd`).replace(/offline/g, `Offline`))
                    .addRow("In", stored.user.presence.game ? `${stored.user.presence.game.name}` : "Nothing")
                    .addRow(`ROLES`, `Roles:`)
                    var roles = []
                    rols.forEach(role => {roles.push(role)});
                    roles = roles.sort(function(a, b){return a.position - b.position})
                    roles.forEach(role => {
                        table.addRow(role.name, `${role.id}; Perms: ${role.permissions}; Pos: ${role.calculatedPosition}`)
                    });
                    table.addRow('PERMS', 'Permissions:')
                    if(prms != 2146959103 && prms != 2146958847) {
                        var {Permissions} = require('discord.js')
                        var permissions = new Permissions(prms)
                        permissions.toArray(false).forEach(permiss => {
                            table.addRow('PERMS', permiss)
                        })
                    } else {
                        table.addRow('PERMS', 'ADMIN')
                    }
                    send(table, message)
                }
            }
        }
        if(tokens[i] == 'role'){
            i++
            var fund = false
            ef.guilds.forEach(guild => {
                guild.roles.forEach(role => {
                    if(role.id == tokens[i]) {
                        fund = true
                        stored.role = role
                    }
                })
            })
            if(fund == false) {
                ef.models.send({
                    object: message,
                    message: `${ef.emotes.markNo}Nie znaleziono roli.`
                })
                return
            }
            i++
            if(tokens[i] == 'print') {
                const table = new AsciiTable(stored.role.id)
                .addRow('Name', stored.role.name)
                .addRow('GuildID', stored.role.guild.id)
                .addRow('Mentionable', `${stored.role.mentionable ? 'Yes' : 'No'}`)
                .addRow('Position', `${stored.role.calculatedPosition}`)
                .addRow('PERMS', 'Permissions:')
                if(stored.role.permissions != 2146959103) {
                    var {Permissions} = require('discord.js')
                    var permissions = new Permissions(stored.role.permissions)
                    permissions.toArray(false).forEach(permiss => {
                        table.addRow('PERMS', permiss)
                    })
                } else {
                    table.addRow('PERMS', 'ADMIN')
                }
                send(table, message)
            }
        }
        if(tokens[i] == 'root') {
            i++
            if(tokens[i] == 'print'){
                var usrcnt = await countUsr()
                var commands = {
                    count: 0
                }
                await ef.plugins.forEach(plugin => {
                    for(const command of plugin.commands){
                        commands.count++
                    }
                })
                var listencnt = 0
                for(var a in ef.queue) listencnt++
                const table = new AsciiTable(`ROOT - PRINT`)
                .addRow(`Name`, `${ef.user.username}#${ef.user.discriminator}`)
                .addRow(`Server Count`, `${ef.guilds.size}`)
                .addRow(`Member Count`, `${usrcnt}`)
                .addRow(`Command Count`, `${commands.count}`)
                .addRow('People listening music', `${listencnt}`)
                send(table, message)
            } else if(tokens[i] == 'members') {
                const table = new AsciiTable(`ROOT - MEMBERS`)
                .addRow('INFO', `Members: `)
                var user = {}
                var res = new Promise((resolve, reject) => {
                    ef.guilds.forEach(async (guild, index, array) => {
                        await guild.fetchMembers()
                        guild.members.forEach(member => {
                            user[member.user.id] = {
                                tag: member.user.tag,
                                id: member.user.id
                            }
                        })
                        if(index == array.lastKey()) resolve(user)
                    })
                })
                var users = await res
                var count = 0
                for(var mem in users) {
                    table.addRow(users[mem].id, users[mem].tag)
                    count++
                }
                table.addRow(`INFO`, `Member count: ${count}`)
                send(table, message)
            } else if(tokens[i] == 'collections') {
                const table = new AsciiTable(`ROOT - COLLECTIONS`)
                ef.db.collections.forEach(collection => {
                    table.addRow(`DATA`, `${collection}         `)
                })
                send(table, message)
            } else if(tokens[i] == 'tokens') {
                const table = new AsciiTable(`ROOT - TOKENS`)
                ef.tokens.secrets.forEach(token => {
                    var cache = ef.tokens[token].slice(0, 2)
                    cache += '...'
                    cache += ef.tokens[token].slice(ef.tokens[token].length - 2, ef.tokens[token].length - 0)
                    table.addRow(`${token}`, `${cache}`)
                })
                send(table, message)
            } else if(tokens[i] == 'guilds') {
                const table = new AsciiTable(`ROOT - GUILDS`)
                .addRow('INFO', `Guilds:        `)
                var count = 0
                ef.guilds.forEach(guild => {
                    table.addRow(`${guild.id}`, `${guild.name}`)
                    count++
                })
                table.addRow(`INFO`, `Guild count: ${count}`)
                send(table, message)
            }
        }
        if(tokens[i] == 'syntax') {
            const table = new AsciiTable(`CLI SYNTAX`)
            .addRow(`guild`, `<id>/self print/channels/members/roles/delete/queue`)
            .addRow(`user`, `<id>/self print/<guild id>`)
            .addRow(`role`, `<id> print`)
            .addRow(`root`, `memebers/guilds/tokens/collections/print`)
            send(table, message)
        }
    }
} 