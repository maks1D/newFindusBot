exports.output = async ({message, guild, args}) => {
    for(var i = 0; i < ef.db.collections.length; i++){
        ef.db.cache.set(`${ef.db.collections[i]}`, await ef.db.findDocMongo(`${ef.db.collections[i]}`))
    }

    ef.db.cache.save()

    ef.models.send({
        object: message,
        message: `${ef.emotes.markYes}Pomyślnie uaktualniono pliki cache!`
    })
}

exports.data = {
    triggers: ['dbupdate'],
    description: 'Uaktualnia pliki cache.',
    usage: [
        '{prefix}{command}'
    ],
    developer: true
}