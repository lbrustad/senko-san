exports.run = async (senko, message, args) => {
    let pfp = senko.user.displayAvatarURL;
    let embed = new Discord.RichEmbed()
    .setTitle(`About ${senko.user.username} `)
    .setAuthor(senko.user.username, senko.user.avatarURL)
    .setDescription(`Version ${pack.version} `)
    .setColor("#f28a30")
    .setThumbnail(pfp)
    .addField("Author", `${pack.ownerid}`)
    .addField("Prefix", `\`${config.prefix}\``)
    .addField("Server Link:", "discord.gg/KfFTecu")
    await message.channel.send(embed);
}

exports.help = {
    name: 'botinfo',
    description: 'Displays info about the bot.'
}
