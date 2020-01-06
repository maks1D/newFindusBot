exports.output = async ({message, guild, args}) => {
  async function emoji(emojiname) { return await ef.utils.emoji.get(emojiname, message) }
  if(ef.guilds.get(args[0]).available == false) return ef.models.send({
    object: message,
    color: ef.colors.red,
    message: `${await emoji('markNo')}Ten serwer jest niedostępny.`
  })
  try {
    ef.guilds.get(args[0]).leave()

    ef.models.send({
      object: message,
      message: `${await emoji('markYes')}Pomyślnie opuszczono serwer.`
    })
  } catch (err) {
    ef.models.send({
      object: message,
      message: `${await emoji('markYes')}Nie można opuścić serwera.`
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