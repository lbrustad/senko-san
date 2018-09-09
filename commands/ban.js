const Discord = require("discord.js");
const senko = new Discord.Client({disableEveryone: true});
exports.run = async (client, message, args) => {
    if(!args)
      await message.channel.send("Usage: ```ban {user} {reason}```")
    if(!message.member.hasPermission("BAN_MEMBERS"))
      return message.channel.send("`Error 403:`You don't have the permission to use this command.");
    
    let member = message.mentions.members.first();
    if(!member)
      return message.channel.send("`Error 404:`Invalid target.");
    if(!member.bannable) 
      return message.channel.send("`Error 403:`No permission to ban.");

    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";
    
    await member.ban(reason)
      .catch(error => message.channel.send(`Could not ban : ${error}`));
    message.channel.send(`${member.user.tag} has been banned by ${message.author.tag} for: ${reason}`);
}
  exports.help = {
    name: 'ban',
    description: 'Bans a user from the server',
    usage: 'ban {user} {reason}'
}
