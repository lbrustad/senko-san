const Discord = require("discord.js");
const senko = new Discord.Client({disableEveryone: true});
exports.run = async (client, message, args) => {
        if(!args)
          await message.channel.send("Usage: ```kick {user} {reason}```")
        if(!message.member.roles.hasPermission("KICK_MEMBERS"))
          return message.channel.send("`Error 403:`You don't have the permission to use this command.");
        
        let member = message.mentions.members.first() || message.guild.members.get(args[0]);
        if(!member)
          return message.channel.send("`Error 404:`Invalid target.");
        if(!member.kickable) 
          return message.reply("`Error 403:`No permission to kick.");
        
        
        let reason = args.slice(1).join(' ');
        if(!reason) reason = "No reason provided";
        
        
        await member.kick(reason)
          .catch(error => message.channel.send(`Unable to kick: ${error}`));
        message.channel.send(`${member.user.tag} has been kicked by ${message.author.tag} for: ${reason}`);
    
      
}

exports.help = {
    name: 'kick',
    description: 'Kicks a user from the server.',
    usage: 'kick {user} {reason}'
}
