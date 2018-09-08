exports.run = async (senko, message, args) => {
    await message.channel.send("Bot Page: <https://crkza.github.io/senko-san>");
}

exports.help = {
    name: 'docs',
    description: "Links to the bot's website."
}
