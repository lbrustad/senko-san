const Discord = require("discord.js");
const senko = new Discord.Client({disableEveryone: true});
exports.run = async (senko, message, args) => {
    if (!senko.ping) return message.channel.send("Latency: Literally empty, Thanks [insert online hosting service here]."); 
    else{
        const ping = math.round(senko.ping) 
        return message.channel.send(`Latency: :vertical_traffic_light:  ${ping} milliseconds`)
    }
    }
    


exports.help = {
    name: 'ping',
    description: "Displays Latency",
    usage: ""
}