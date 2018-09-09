exports.run = async (client, message, args) => {
        if(!args)
            await message.channel.send("Usage: ```purge {amount}```");
        if(!message.member.hasPermission("MANAGE_MESSAGES"))
            return message.channel.send("Unable to purge, You don't have the permission to do so.");
        const deleteCount = parseInt(args[0], 10);
        
        if(!deleteCount || deleteCount < 2 || deleteCount > 100)
          return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");
        
        const fetched = await message.channel.fetchMessages({limit: deleteCount});
        message.channel.bulkDelete(fetched)
          .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
      
}

exports.help = {
    name: 'purge',
    description: 'Purges a specified amount of messages. (Max 100)',
    usage: 'purge {amount}'
}
