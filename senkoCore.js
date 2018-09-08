// Prerequisites loading code
const { prefix, token } = require('./config.json');
const Discord = require('discord.js');
const senko = new Discord.Client({ disableEveryone: true });
const Enmap = require('enmap');
const fs = require('fs');
const pack = require('./package.json');
require('http').createServer().listen(3000);
// Error handling
senko.on('error', err => {
  console.log(err);
})
// Startup Procedure
senko.on('ready', async () => {
  senko.guilds.forEach(guild => {
    senko.settings.ensure(guild.id, { prefix: 'sk-', aliases: {} });
  });
  console.log(`-----------------------------------`)
  console.log(`Version ${pack.version}`)
  console.log(`Made by ${pack.author}`)
  console.log(`Incomplete Alpha`)
  console.log(`[${senko.user.username}] is now online.`);
  console.log(`Bot is on ${senko.guilds.size} servers.`)
  await senko.user.setActivity("w/ Nakano");
});
senko.commands = new Enmap({name: 'commands'});
senko.settings = new Enmap({name: 'settings'});
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
senko.on('message', message => {
  if (message.author.bot) return;
  if (!message.guild) return message.channel.send('Sorry, but DMs aren\'t supported. Don\'t go crying on me when you found a problem!');
  if (message.content.indexOf(prefix) !== 0) return;

	function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
    return text;
}

  let args = message.content.slice(prefix.length).trim().split(/ +/g);
  let command = args.shift().toLowerCase();

  let aliasCmd;
  for(const aliases of Object.values(senko.settings.get(message.guild.id, 'aliases'))) {
    if(aliases.find(key => key === command)) {
      const guildAliases = senko.settings.get(message.guild.id, 'aliases'), cmdName = Object.keys(guildAliases).find(key => guildAliases[key] === aliases);
      aliasCmd = cmdName;
    }
  }

  let cmdFile = senko.commands.get(command) || senko.commands.get(aliasCmd);
  if(!cmdFile) return;
  cmdFile.run(senko, message, args);
	
	  if (message.content.startsWith(prefix + "eval")) {
    if(message.author.id !== pack.owner) return;
    try {
      const code = args.join(" ");
      let evaled = eval(code);

      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);

      message.channel.send(clean(evaled), {code:"xl"});
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
  }
});

senko.on('guildDelete', guild => {
  if (senko.settings.has(guild.id)) return senko.settings.delete(guild.id);
});


// The part that makes this bot go online
senko.login(process.env.token).catch()
// Self hosting
// senko.login(token)
