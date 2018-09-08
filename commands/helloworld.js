const Discord = require("discord.js");
const senko = new Discord.Client({disableEveryone: true});
exports.run = async (client, msg, args) => {
    await msg.channel.send("Hello, world!");
}

exports.help = {
    name: 'helloworld',
    description: 'Hello world!'
}
