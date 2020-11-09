const Discord = require('discord.js')

module.exports = async (data) => {

    data = await Object.assign({
        object: null,
        message: `[Missing Message Content]`,
        hightlight: false,
        thumbnail: null,
        image: null,
        color: ef.color,
        footer: '',
        inmessage: '',
        author: [``, null],
        file: null,
        title: '',
        url: null
    }, data)

    const embed = new Discord.RichEmbed()
        .attachFile(data.file)
        .setDescription(`${data.hightlight ? `\``: ``}${data.message.slice(0,2000)}${data.hightlight ? `\``: ``}`)
        .setThumbnail(data.thumbnail)
        .setImage(data.image)
        .setColor(data.color)
        .setTitle(data.title.slice(0,256))
        .setFooter(data.footer)
        .setAuthor(data.author[0], data.author[1])
        .setURL(data.url)

    if (data.channel) {
    
        const channel = await ef.channels.get(data.channel)

        return channel.send(data.inmessage, {embed})

    } else {

        return data.object.channel.send(data.inmessage, {embed})
    }
}
