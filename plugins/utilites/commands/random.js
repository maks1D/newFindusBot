exports.output = async ({message, args}) => {

    args = args.join(' ')

    if (!args.includes(",")) {
        ef.models.send({
            object: message,
            message: `**You have drawn option 1:** \`${args[0]}\``
        })
        return
    }

    args = args.split(",")

    let id = await ef.utils.number.random(0, args.length - 1)

    ef.models.send({
        object: message,
        message: `**You have drawn option ${id + 1}:** \`${args[id]}\``
    })
  }
  
  exports.data = {
    triggers: ['random'],
    description: 'Chooses one of several options.',
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
  