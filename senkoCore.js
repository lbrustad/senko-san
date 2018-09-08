// Prerequisites loading code
const Discord = require('discord.js');
const senko = new Discord.Client({
  disableEveryone: true
});
const Enmap = require('enmap');
const fs = require('fs');
const p = require('path');
const { token } = require('./config.json');
require('http').createServer().listen(3000);
// Error handling
senko.on('error', err => {
  console.log(err);
});
senko.commands = new Enmap({name: 'commands'});
senko.settings = new Enmap({name: 'settings'});
// Startup Procedure
senko.on('ready', async () => {


});
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
          const [ evtName ] = file.split('.');
          senko.on(evtName, (...args) => props.run(senko, ...args));
        }
      } catch (err) {
        console.log(err.stack);
      }
    }
  });
}


async function start() {
  await loadCommands(p.join(__dirname, "commands"));
  await loadEvents(p.join(__dirname, "events"));
}
start();

senko.login(token).catch(err => console.log(err.stack));
