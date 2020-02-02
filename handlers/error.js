module.exports = async (message, error, suggest = false) => {
    const code = Math.floor(Math.random() * 1000 + 1)
    if(!suggest){
        ef.models.send({
            object: message,
            message: `O nie! Jakiś błąd wkradł się do mojego kodu!
                    Muszę powiadomić developera, on napewno pomoże.
                    Tymczasem informuję, że spowodowałeś błąd o kodzie **#${code}**.
                    Przepraszam za utrudnienia!
                    `,
            color: ef.colors.red
        })
    }

    if(ef.type == 'beta') {
        return console.log(error)
    }
    
    ef.roles.developers.forEach(dev => {
        ef.users.get(dev).send(`
            ***Error Raport:***

            **[Server ID]:** \`${message.guild.id}\`,
            **[User ID]:** \`${message.author.id}\`,
            **[Command]:** \`${message.content}\`,

            ${error.stack ? `**[Error Stack]:**
            \`${error.stack}\`` : `**[Error]:**
            \`${error}\``}
        `)
    });
}