exports.run = (senko, guild) => {
    if (senko.settings.has(guild.id)) return senko.settings.delete(guild.id);
};

exports.help = {
    name: 'guildDelete'
}