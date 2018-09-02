const Discord = require("discord.js");
const senko = new Discord.Client({disableEveryone: true});
exports.run = async (senko, message, args) => {
    if(!args)
        await message.channel.send("Usage: ```echo {message}```")
    const sayMessage = args.join(" ");
        message.delete().catch(O_o=>{}); 
        message.channel.send(sayMessage);
}

exports.help = {
    name: 'echo'
}