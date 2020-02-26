exports.output = async ({message, guild, args}) => {
  if(ef.guilds.get(args[0]).available == false) return ef.models.send({
    object: message,
    color: ef.colors.red,
    message: `${ef.emotes.markNo}Ten serwer jest niedostępny.`
  })
  try {
    ef.guilds.get(args[0]).leave()

    ef.models.send({
      object: message,
      message: `${ef.emotes.markYes}Pomyślnie opuszczono serwer.`
    })
  } catch (err) {
    ef.models.send({
      object: message,
      color: ef.colors.red,
      message: `${ef.emotes.markNo}Nie można opuścić serwera.`
    })
  }
}

exports.data = {
    triggers: ['serverleave'],
    description: 'Opuszcza serwer.',
    usage: [
        '{prefix}{command} <id serwera>'
    ],
    args: [
        {
            type: 'id',
          name: 'id serwera'
        }
      ],
    developer: true
}