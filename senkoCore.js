// Prerequisites loading code
const {
  token,
  mongourl
} = require('./config.json');
const Discord = require('discord.js');
const senko = new Discord.Client({
  disableEveryone: true
});
const Enmap = require('enmap');
const fs = require('fs');
const pack = require('./package.json');
const p = require('path');
const mongo = require('./provider/mongo');
require('http').createServer().listen(3000);


senko.once('ready', async () => {

  const db = new mongo({url: mongourl});
  senko.db = db;

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

senko.commands = new Enmap();
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

async function start(){
  await loadCommands(p.join(__dirname, "commands"));
  await loadEvents(p.join(__dirname, "events"));
  senko.login(token).catch(err => console.log(err.stack));
}
start();