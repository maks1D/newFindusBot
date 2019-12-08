exports.output = async ({message, args}) => {
    ef.http.get(`https://coffee.alexflipnote.xyz/random.json`)
            .then(async response => {
                let res = response.body
                let file = res.file
                ef.models.send({
                    object: message,
                    message: "☕ Your coffee is ready",
                    image: file,
                })
            })
}

exports.data = {
    triggers: ['coffee'],
    description: '☕',
}
