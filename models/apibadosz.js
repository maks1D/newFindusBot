const imageType = require('image-type')
const { Attachment } = require('discord.js')
module.exports = async (data) => {

  data = await Object.assign({
      object: null,
      endpoint: null,
      type: 'image',
      output: null,
      title: '',
      color: ef.color,
      footer: ''
  }, data)

  ef.http.get(`http://api.badosz.com/${data.endpoint}`)
           .set(
             {
               Authorization: ef.tokens.badoszapi
             }
            )
            .then(async response => {
                if (data.type == 'text') {
                  ef.models.def({
                    object: data.object,
                    message: `\`${response.body[data.output]}\``,
                    footer: `api.badosz.com`
                  })
                } else if (data.type == "image") {
                    const type = imageType(response.body)
                    const file = new Attachment(response.body, `file.${type ? type.ext : 'png'}`)
                    ef.models.def({
                      object: data.object,
                      message: data.title,
                      file: file,
                      image: `attachment://file.${type ? type.ext : 'png'}`,
                      footer: `api.badosz.com • Invoked by ${/*data.object.author.id*/"Findus"}`,
                      channel: "519164929966735377"
                    })
                }
            })//.catch(error => {
              //return require('../handlers/error')(data.object, error)
            //})
}
