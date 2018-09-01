exports.run = async (senko, message, args) => {
    await message.channel.send("Bot Page: <https://mrcappu.wordpress.com/senko/>")
}

exports.help = {
    name: 'docs'
    ,description: "loads the documentations"
    ,usage: ""
}