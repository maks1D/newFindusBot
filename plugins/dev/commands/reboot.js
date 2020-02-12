exports.output = async ({message, guild, args}) => {

    async function emoji(emojiname) { return await ef.utils.emoji.get(emojiname, message) }

    await ef.models.send({

        object: message,

        message: `${await emoji('markYes')}Pomyślnie rozpoczęto restart bota.`

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

