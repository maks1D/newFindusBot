exports.output = async ({message, guild, args}) => {
    await ef.models.send({

        object: message,

        message: `${ef.emotes.markYes}Pomyślnie rozpoczęto restart bota.`

    })

    ef.http.delete(`https://api.heroku.com/apps/${ef.tokens.currentApp}/dynos`)
            .set("Authorization", 'Basic ' + Buffer.from(ef.tokens.HerokuCLIUserID + ':' + ef.tokens.HerokuCLIToken).toString('base64'))
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/vnd.heroku+json; version=3')
            .catch(err => {
                console.log(err)
            })

}

exports.data = {

    triggers: ['reboot'],

    description: 'Restartuje bota.',

    usage: [

        '{prefix}{command}'

    ],

    developer: true

}

