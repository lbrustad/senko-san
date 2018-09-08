const Discord = require("discord.js");
exports.run = async (senko, message, args) => {
    let serverIcon = message.guild.iconURL;
    let embed = new Discord.RichEmbed()
    .setTitle("About this server")
    .setAuthor(senko.user.username, senko.user.avatarURL)
    .setThumbnail(serverIcon)
    .setDescription("Displaying Information about this Server.")
    .setColor("#f28a30")
    .setTimestamp()
    .addField("Server Name", message.guild.name)
    .addField("Created on", message.guild.createdAt)
    .addField("You Joined on", message.member.joinedAt)
    .addField("Member Count", message.guild.memberCount);

    await message.channel.send(embed);
}

exports.help = {
    name: 'serverinfo',
    description: "Displays info about the current server."
}
