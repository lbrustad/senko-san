//Prerequisites loading code
const config = require("./config.json");
const Discord = require("discord.js");
const senko = new Discord.Client({disableEveryone: true});
const Enmap = require("enmap");
const fs = require("fs");
const pack =require("./package.json")
//Errors
senko.on('error', async (err) => {
     await console.log(await err)
}
// Startup Procedure
,prefix = config.prefix
,senko.on("ready", async () => {
    console.log(`-----------------------------------`)
    console.log(`Version ${pack.version}`)
    console.log(`Made by ${pack.author}`)
    console.log(`Incomplete Alpha`)
    console.log(`[${senko.user.username}] is now online.`);
    console.log(`Bot is on ${senko.guilds.size} servers.`)
    senko.user.setActivity("w/ Nakano");
}));
senko.commands = new Enmap();
// This loop reads the /events/ folder and attaches each event file to the appropriate event.
//Commands
fs.readdir('./commands/', (err, files) => {
    if (err) console.log(err);

    let jsfile = files.filter(f => f.split('.').pop() === 'js');
    if (jsfile.length <= 0) {
        return console.log('Couldn\'t find commands');
    }

    jsfile.forEach((f, i) => { //eslint-disable-line no-unused-vars
        let props = require(`./commands/${f}`);
        console.log(`${f} loaded.`);
        senko.commands.set(props.help.name, props);
    });
});
senko.on('message', async msg => {
    let msgArr = msg.content.split(' ');
    let cmd = msgArr[0];
    let args = msgArr.slice(1);
    // let args = msgArr.slice(1).filter(n => n != '');

    let cmdFile = senko.commands.get(cmd.slice(prefix.length));
    if (cmdFile) cmdFile.run(senko, msg, args);
})
// The real code that makes this bot a bot
senko.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return message.channel.send("Sorry, but DMs aren't supported. Don't go crying on me when you found a problem!")
    if(message.content.indexOf(config.prefix) !== 0) return;
	if(!message.content.startsWith(prefix)) return;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

});

//The part that makes this bot go online
senko.login(process.env.token)