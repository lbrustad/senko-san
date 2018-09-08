// Prerequisites loading code
const {
  token
} = require('./config.json');
const Discord = require('discord.js');
const senko = new Discord.Client({
  disableEveryone: true
});
const Enmap = require('enmap');
const fs = require('fs');
const pack = require('./package.json');
const p = require('path');
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
=======

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


function loadCommands(path) {
  fs.readdir(path, async (err, files) => {
    if (err) console.log(err);
    for (var file of files) {
      if (fs.statSync(path + '/' + file).isDirectory()) await loadCommands(path + '/' + file);
      try {
        if (file.endsWith('.js')) {
          var props = require(path + '/' + file);
          console.log(`${file} loaded`);
          senko.commands.set(props.help.name, props);
        }
      } catch (err) {
        console.log(err.stack);
      }
    }
  });
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
      =======
                                                   

function loadEvents(path) {
  fs.readdir(path, async (err, files) => {
    if (err) console.log(err);
    for (var file of files) {

      if (fs.statSync(path + '/' + file).isDirectory()) await loadEvents(path + '/' + file);
      try {
        if (file.endsWith('.js')) {
          var props = require(path + '/' + file);
          console.log(`EVENT_${file} loaded`);
          senko.on(props.help.name, (...args) => props.run(...args, senko));
        }
      } catch (err) {
        console.log(err.stack);
      }
    }
  });
}

senko.on('guildDelete', guild => {
  if (senko.settings.has(guild.id)) return senko.settings.delete(guild.id);
});


async function start(){
  await loadCommands(p.join(__dirname, "commands"));
  await loadEvents(p.join(__dirname, "events"));
  senko.login(token).catch(err => console.log(err.stack));
}
start();