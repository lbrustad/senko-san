// Prerequisites loading code
const { prefix, token } = require('./config.json');
const Discord = require('discord.js');
const senko = new Discord.Client({ disableEveryone: true });
const Enmap = require('enmap');
const fs = require('fs');
const pack = require('./package.json')

// Error handling
senko.on('error', async (err) => {
     await console.log(await err)
})
// Startup Procedure
senko.on('ready', async () => {
    console.log(`-----------------------------------`)
    console.log(`Version ${pack.version}`)
    console.log(`Made by ${pack.author}`)
    console.log(`Incomplete Alpha`)
    console.log(`[${senko.user.username}] is now online.`);
    console.log(`Bot is on ${senko.guilds.size} servers.`)
    senko.user.setActivity("w/ Nakano");
});
senko.commands = new Enmap();
// Commands
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

// The real code that makes this bot a bot
senko.on('message', async message => {
  if (message.author.bot) return;
  if (message.channel.type === 'dm') return message.channel.send('Sorry, but DMs aren\'t supported. Don\'t go crying on me when you found a problem!')
  if (message.content.indexOf(prefix) !== 0) return;
	if (!message.content.startsWith(prefix)) return;

  let messageArray = message.content.split(' ');
  let cmd = messageArray[0];
  let args = message.content.slice(prefix.length).trim().split(/ +/g);
  let command = args.shift().toLowerCase();

  let cmdFile = senko.commands.get(cmd.slice(prefix.length));
  if (cmdFile) cmdFile.run(senko, message, args);
});

// The part that makes this bot go online
senko.login(process.env.token)
// Self hosting
// senko.login(token)
