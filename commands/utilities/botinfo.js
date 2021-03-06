const Discord = require("discord.js")
const config = require("../../config.json")
const pack = require("../../package.json")
exports.run = async (senko, message, args) => {
    let pfp = senko.user.displayAvatarURL;
    let embed = new Discord.RichEmbed()
    .setTitle(`About ${senko.user.username} `)
    .setAuthor(senko.user.username, senko.user.avatarURL)
    .setDescription(`${pack.version}`)
    .setColor("#f28a30")
    .setThumbnail(pfp)
    .addField("Author", `<@${config.owner}>`)
    .addField("Prefix", `\`sk-\``)
    .addField("Server Link:", "discord.gg/KfFTecu")
    await message.channel.send(embed);
}

exports.help = {
    name: 'botinfo',
    description: 'Displays info about the bot.'
}
