const Discord = require("discord.js")
exports.run = async (senko, message, args) => {
    let pfp = senko.user.displayAvatarURL;
    let embed = new Discord.RichEmbed()
    .setTitle(`About ${senko.user.username} `)
    .setAuthor(senko.user.username, senko.user.avatarURL)
    .setDescription(`Version 0.1.4 Alpha `)
    .setColor("#f28a30")
    .setThumbnail(pfp)
    .addField("Author", `Cappuchino`)
    .addField("Prefix", `\`sk-\``)
    .addField("Server Link:", "discord.gg/KfFTecu")
    await message.channel.send(embed);
}

exports.help = {
    name: 'botinfo',
    description: 'Displays info about the bot.'
}
