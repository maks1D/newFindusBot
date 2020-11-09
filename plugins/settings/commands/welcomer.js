exports.output = async ({message, guild, args}) => {
    var translations = {en: [], pl: [], ru: []}

    if(args.length >= 2){

        if(args[0] == 'channel'){
            
            if(args[1]){

                var id = args[1].replace(/[<#>]/g, '')
                var channel

                if(message.guild.channels.get(id)){
                    channel = message.guild.channels.get(id)
                } else if(message.guild.channels.get(args[1])) {
                    channel = message.guild.channels.get(args[1])
                }
                if(channel && channel.type === 'text'){
                    ef.db.editDoc({'id': `${guild.id}`}, {"settings.welcomer.channel": channel.id}, 'servers')
                    translations.pl[0] = `${ef.emotes.markYes}Pomyślnie ustawiono kanał na: <#${channel.id}>.`
                    translations.en[0] = `${ef.emotes.markYes}The channel has been successfully set to: <#${channel.id}>.`
                    translations.ru[0] = `${ef.emotes.markYes}Канал был успешно настроен на: <#${channel.id}>.`
                    return ef.models.send({
                        object: message,
                        message: `${translations[guild.settings.language][0]}`
                    })
                } else {
                    translations.pl[0] = `${ef.emotes.markNo}Nie znaleziono kanału!`
                    translations.en[0] = `${ef.emotes.markNo}Channel not found!`
                    translations.ru[0] = `${ef.emotes.markNo}Канал не найден!`
                    return ef.models.send({
                        object: message,
                        message: `${translations[guild.settings.language][0]}`,
                        color: ef.colors.red
                    })
                }
            } else {
                translations.pl[0] = `${ef.emotes.markNo}Musisz wzmiankować kanał!`
                translations.en[0] = `${ef.emotes.markNo}You have to mention the channel!`
                translations.ru[0] = `${ef.emotes.markNo}Вы должны упомянуть канал!`
                return ef.models.send({
                    object: message,
                    message: `${translations[guild.settings.language][0]}`,
                    color: ef.colors.red
                })
            }
        } else if(args[0] == "message"){
            args.shift()
            if(args[0]){
                var mess = args.join(' ')
                ef.db.editDoc({'id': `${guild.id}`}, {"settings.welcomer.message": mess}, 'servers')
                translations.pl[1] = `${ef.emotes.markYes}Nowa wiadomość pomyślnie ustawiona!`
                translations.en[1] = `${ef.emotes.markYes}New message successfully set!`
                translations.ru[1] = `${ef.emotes.markYes}Новое сообщение успешно установлено!`
                return ef.models.send({
                    object: message,
                    message: `${translations[guild.settings.language][1]}`
                })
            }else{
                translations.pl[1] = `${ef.emotes.markNo}Wpisz poprawną wiadomość!`
                translations.en[1] = `${ef.emotes.markNo}Enter the correct message!`
                translations.ru[1] = `${ef.emotes.markNo}Введите правильное сообщение!`
                return ef.models.send({
                    object: message,
                    message: `${translations[guild.settings.language][1]}`,
                    color: ef.colors.red
                })
            }
        } else if(args[0] == 'addrole') {
            var id = args[1].replace(/[<@&>]/g, '')
            var role

            if(message.guild.roles.get(id)){
                role = message.guild.roles.get(id).id
            } else if(message.guild.roles.get(args[1])) {
                role = message.guild.roles.get(args[1]).id
            }

            if(!role) {
                translations.pl[2] = `${ef.emotes.markYes}Pomyślnie wyłączono dodawanie ról!`
                translations.en[2] = `${ef.emotes.markYes}Successfully disabled role adding!`
                translations.ru[2] = `${ef.emotes.markYes}Успешно отключено добавление ролей!`
                ef.models.send({
                    object: message,
                    message: `${translations[guild.settings.language][2]}`
                })
                return ef.db.editDoc({id: guild.id}, {'settings.welcomer.roleGive': ''}, 'servers')
            } else {
                translations.pl[2] = `${ef.emotes.markYes}Pomyślnie włączono dodawanie ról!`
                translations.en[2] = `${ef.emotes.markYes}Successfully enabled role adding!`
                translations.ru[2] = `${ef.emotes.markYes}Успешно добавлено добавление ролей!`
                ef.models.send({
                    object: message,
                    message: `${translations[guild.settings.language][2]}`
                })
                return ef.db.editDoc({id: guild.id}, {'settings.welcomer.roleGive': role}, 'servers')
            }
        }
    } else if(args[0] == 'on' || args[0] == 'off'){
        var statement = args[0] == 'on' ? "true" : "false"
        ef.db.editDoc({'id': `${guild.id}`}, {"settings.welcomer.enabled": statement}, 'servers')
        translations.pl[3] = `${ef.emotes.markYes}Welcomer został ${args[0] == "on" ? "włączony" : "wyłączony"}.`
        translations.en[3] = `${ef.emotes.markYes}Welcomer has been ${args[0] == "on" ? "enabled" : "disabled"}.`
        translations.ru[3] = `${ef.emotes.markYes}Приветствие было ${args[0] == "on" ? "включен" : "отключено"}.`
        return ef.models.send({
            object: message,
            message: `${translations[guild.settings.language][3]}`
        })
    }

    translations.pl[4] = 
`Welcomer na twoim serwerze jest ${guild.settings.welcomer.enabled == "true" ? `włączony` : `wyłączony`},
Kanał: ${guild.settings.welcomer.channel != "undefined" ? `<#${guild.settings.welcomer.channel}>` : `\`[Nie ustawiony]\``},
Wiadomość: ${guild.settings.welcomer.message != "undefined" ? `\`${guild.settings.welcomer.message}\`` : `\`[Nie ustawiona]\``},
Dodawana rola: ${guild.settings.welcomer.roleGive != '' ? `\`${message.guild.roles.get(guild.settings.welcomer.roleGive).name}\`` : `\`[Nie ustawiona]\``}.

Aby zmienić ustawienia:
**kanału**, wpisz: \`${ef.prefix}welcomer channel <#nowy kanał>\`,
**wiadomości**, wpisz: \`${ef.prefix}welcomer message <nowa wiadomość>\`,
**włączenia**, wpisz: \`${ef.prefix}welcomer <on/off>\`,
**dodawania ról**, wpisz: \`${ef.prefix}welcomer addrole <@rola / cokolwiek innego (aby wyłączyć)>\`.`

    translations.en[4] = 
`Welcomer on your server is ${guild.settings.welcomer.enabled == "true" ? "enabled" : "disabled"},
Channel: ${guild.settings.welcomer.channel != "undefined" ? `<#${guild.settings.welcomer.channel}>` : `\`[Not set]\``},
Message: ${guild.settings.welcomer.message != "undefined" ? `\`${guild.settings.welcomer.message}\`` : `\`[Not set]\``},
Role to add: ${guild.settings.welcomer.roleGive != '' ? `\`${message.guild.roles.get(guild.settings.welcomer.roleGive).name}\`` : `\`[Not set]\``}.

To change settings of:
**channel**, type: \`${ef.prefix}welcomer channel <#new channel>\`,
**messages**, type: \`${ef.prefix}welcomer message <new message>\`,
**status**, type: \`${ef.prefix}welcomer <on/off>\`,
**adding roles**, type: \`${ef.prefix}welcomer addrole <@role / anything else (to disable)>\`.`

    translations.ru[4] = 
`Приветствие на вашем сервере ${guild.settings.welcomer.enabled == "true" ? "включен" : "отключено"},
Канал:  ${guild.settings.welcomer.channel != "undefined" ? `<#${guild.settings.welcomer.channel}>` : `\`[Не установлено]\``},
Сообщение: ${guild.settings.welcomer.message != "undefined" ? `\`${guild.settings.welcomer.message}\`` : `\`[Не установлено]\``},
Добавлена ​​роль: ${guild.settings.welcomer.roleGive != '' ? `\`${message.guild.roles.get(guild.settings.welcomer.roleGive).name}\`` : `\`[Не установлено]\``}.

Чтобы изменить настройки:
**канал**, введите: \`${ef.prefix}welcomer channel <#новый канал>\`,
**сообщения**, введите: \`${ef.prefix}welcomer message <новое сообщение>\`,
**включение**, введите: \`${ef.prefix}welcomer <on/off>\`,
**добавив роли**, введите: \`${ef.prefix}welcomer addrole <@роль / что-нибудь еще (отключить)>\`.`

    ef.models.send({
        object: message,
        message: `${translations[guild.settings.language][4]}`
    })
}

exports.data = {
    triggers: ['welcomer'],
    description: {
        pl: 'Pokazuje lub zmienia ustawienia wiadomości witających nowych członków serwera.',
        en: 'Shows or changes the settings of messages welcoming new server members.',
        ru: 'Показывает или изменяет настройки сообщений, приветствующих новых участников сервера.'
    },
    usage: {
        pl: [
            '{prefix}{command} channel <#kanał>',
            '{prefix}{command} <on/off>',
            '{prefix}{command} message <wiadomość>',
            '{prefix}{command} addrole <@rola / cokolwiek innego (aby wyłączyć)>',
            '\`\nZmienne w wiadomości: \n\`{user.name}\` - nazwa użytkownika\n\`{user.id}\` - id użytkownika\n\`{user.tag}\` - tag użytkownika (np. \`Findus#\`**7449**)\n\`{user.mention}\` - wzmianka użytkownika \`(np. @Findus)'
        ],
        en: [
            '{prefix}{command} channel <#channel>',
            '{prefix}{command} <on/off>',
            '{prefix}{command} message <message>',
            '{prefix}{command} addrole <@role / anything else (to disable)>',
            '\`\nVariables in message:\n\`{user.name}\`- username\n\`{user.id}\`- user id\n\`{user.tag}\`- user tag (e.g. \`Findus#\`**7449**)\n\`{user.mention}\` - mention of user \`(e.g. @Findus)'
        ],
        ru: [
            '{prefix}{command} channel <#канал>',
            '{prefix}{command} <on/off>',
            '{prefix}{command} message <сообщение>',
            '{prefix}{command} addrole <@роль / что-нибудь еще (отключить)>',
            '\`\nПеременные в сообщении:\n\`{user.name}\`- имя пользователя\n\`{user.id}\`- идентификатор пользователя\n\`{user.tag}\`- тег пользователя (например, \`Findus#\`**7449**)\n\`{user.mention}\` - упоминание пользователя \`(например, @Findus)'
        ]
    },
    userPerms: [
        "MANAGE_GUILD"
    ]
}