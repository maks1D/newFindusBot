exports.output = async ({message, guild, args}) => {
  async function emoji(emojiname) { return await ef.utils.emoji.get(emojiname, message) }
  ef.guilds.get(args[0]).leave()

  ef.models.send({
    object: message,
    message: `${await emoji('markYes')}Pomyślnie opuszczono serwer.`
  })
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