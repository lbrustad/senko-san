// const cmds = require("../commands.json");
module.exports.run = async (senko, message, args, con) => {
  const embed = { color: 0x009966 }, cmds = [];
  senko.commands.forEach(command => {
    cmds.push(`\`${command.help.usage ? command.help.usage : command.help.name}\`: **${command.help.description}**`);
  });
  await message.channel.send({ embed: { title: 'Showing all commands for Project Senko', color: 0x009966, description: cmds.join('\n')} });
    // let cmd = args.join(" ");
    // if(!cmd) message.channel.send(cmds.all);

    // if(cmds[cmd]) await message.channel.send(cmds[cmd]);
}

module.exports.help = {
    name: "help",
    description: "Displays this text"
}
