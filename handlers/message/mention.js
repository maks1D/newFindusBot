module.exports = async (message) => {
    ef.models.def({
        object: message,
        message: `Cześć! Jestem ${ef.user.username},
        Wpisz ${ef.prefix}help aby uzyskać pomoc!`,
        thumbnail: ef.user.displayAvatarURL
    })
}