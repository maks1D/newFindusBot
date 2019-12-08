exports.output = async ({message, args}) => {
    const user = await ef.utils.users.search(message, args[0])
    ef.models.apibadosz({
      object: message,
      title: ':large_orange_diamond: ',
      endpoint: `orangly?url=${user.displayAvatarURL}`
    })
  }
  
  exports.data = {
      triggers: ['orangly'],
      description: 'Generuje twój lub wzkazanego użytkownika zpomarańczowiony awatar.',
      usage: [
        '{prefix}{command} [wzmianka]',
        '{prefix}{command} [ID]',
        '{prefix}{command} [nazwa użytkownika]'
    ]
  }
  