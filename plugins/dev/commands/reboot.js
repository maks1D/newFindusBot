exports.output = async ({message, guild, args}) => {
    await ef.models.send({

        object: message,

        message: `${ef.emotes.markYes}Pomyślnie rozpoczęto restart bota.`

    })

    process.exit()

}

exports.data = {

    triggers: ['reboot'],

    description: 'Restartuje bota.',

    usage: [

        '{prefix}{command}'

    ],

    developer: true

}

