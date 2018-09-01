const fs = require("fs");
const Discord = require("discord.js");

module.exports.run = async(senko, message, args, con) => {
    fs.readdir("./commands/", (err, files) => {
        if(err) console.error(err);

        let jsfiles = files.filter(f => f.split(".").pop() === "js");
        if(jsfiles.length <= 0) {
            console.log("No commands to load!");
            return;
        }

        var namelist = "";
        var desclist = "";
        var usage = "";

        let result = jsfiles.forEach((f, i) => {
            let props = require(`./${f}`);
            namelist = props.help.name;
            desclist = props.help.description;
            usage = props.help.usage;
        
            // send help text
            
            message.author.send(`\`\`\`\n**${namelist}** \n${desclist} \n${usage}\n\`\`\``);
        });
        message.channel.send("Sent a list of commands! Check the DMs")
    });
}

module.exports.help = {
    name: "help",
    description: "show all commands",
    usage: ""
}