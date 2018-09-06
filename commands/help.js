const cmds = require("../commands.json")
const Discord = require("discord.js");
const senko = new Discord.Client({disableEveryone: true});
module.exports.run = async(senko, message, args, con) => {
    let cmd = args.join(" ")
    if(!cmd) message.channel.send(cmds.all);

    if(cmds.hasOwnProperty(cmd) == false){
        message.channel.send("Sorry, This command does not exist.")
    }
    else{
        message.channel.send(cmds.cmd)
    }
}

module.exports.help = {
    name: "help",
    description: "show all commands",
    usage: ""
}