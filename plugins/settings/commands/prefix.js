exports.output = async ({message, guild, args}) => {

    if(args.length >= 1){
        ef.db.editDoc({id: guild.id}, {"settings.prefix": args[0]}, 'servers')
        return ef.models.send({
            object: message,
            message: `${ef.emotes.markYes}Pomyślnie zmieniono prefix na: \`${args[0]}\``
        })
    }

    ef.models.send({
        object: message,
        message: `Mój prefix na serwerze to: \`${guild.settings.prefix}\`
        
        Aby go zmienić wpisz \`${ef.prefix}prefix <nowy prefix>\`
        `
    })
}

exports.data = {
    triggers: ['prefix'],
    description: 'Pokazuje prefix na serwerze.',
    usage: [
        '{prefix}{command} <nowy prefix>'     
    ],
    userPerms: [
        "MANAGE_GUILD"
    ]
}
  