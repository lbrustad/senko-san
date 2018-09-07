const Discord = require("discord.js");
const senko = new Discord.Client({disableEveryone: true});
exports.run = async (senko, message, args) => {
    
    const sayMessage = args.join(" ");
    if(!sayMessage){
        await message.channel.send("Usage: ```echo {message}```")}        message.delete().catch(O_o=>{}); 
        message.channel.send(sayMessage);
}

exports.help = {
    name: 'echo'
}