exports.output = async ({message, args}) => {

    args = args.join(' ')

    if (!args.includes(",")) {
        ef.models.send({
            object: message,
            message: `\`${args}\``
        })
        return
    }

    args = args.split(",")

    if (args.length > 60) {
        return ef.models.send({
            object: message,
            message: `${ef.emotes.markNo} You have provided too much options. Maximum amount is 60.`,
            color: ef.colors.red
        })
    }

    let id = await ef.utils.number.random(0, args.length - 1)

    ef.models.send({
        object: message,
        message: `You have drawn option ${id + 1}: ${args[id]}`
    })
  }
  
  exports.data = {
    triggers: ['random'],
    description: 'Chooses one of several options. Max 60 options.',
    usage: [
        '{prefix}{command} <option 1>, <option 2>, ...'
    ],
    args: [
        {
            'type': 'text',
            'name': 'options'
        }
    ]
  }
  