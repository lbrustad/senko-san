// Prerequisites loading code
const Discord = require('discord.js');
const senko = new Discord.Client({ disableEveryone: true });
const Enmap = require('enmap');
const fs = require('fs');
const p = require('path');
const { token } = require('./config.json');
const pack = require('./package.json');
require('http').createServer().listen(3000);

senko.commands = new Enmap({name: 'commands'});
//senko.settings = new Enmap({name: 'settings'});

function *walkSync(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const pathToFile = p.join(dir, file);
    const isDirectory = fs.statSync(pathToFile).isDirectory();
    if (isDirectory) {
        yield *walkSync(pathToFile);
    } else {
        yield pathToFile;
    }
  }
}

const start = () => {
  for (const event of walkSync(p.resolve(__dirname, 'events'))) {
    // ENABLE IF LINUX
    // const evtName = event.split('/').pop().split('.').shift(), evtFun = require(event);
    // senko.on(evtName, (...args) => evtFun.run(senko, ...args));

    //Disable IF WINDOWS
    senko.on(evtFun.help.name, (...args) => evtFun.run(senko, ...args));
  }
  for(const cmd of walkSync(p.resolve(__dirname, 'commands'))) {
    if(!cmd.endsWith('.js')) return;
    const cmdFun = require(cmd);
    (async function() {
      await senko.commands.defer;
      if (senko.commands.isReady) senko.commands.set(cmdFun.help.name, cmdFun);
    }());
  }
  senko.login(token);
}
start();