const pack = require('../../package.json');

exports.run = async (senko) => {
  senko.guilds.forEach(guild => {
    senko.settings.ensure(guild.id, { prefix: 'sk-', aliases: {} });
  });
  console.log(`-----------------------------------`);
  console.log(`Version ${pack.version}`);
  console.log(`Made by ${pack.author}`);
  console.log(`Incomplete Alpha`);
  console.log(`[${senko.user.username}] is now online.`);
  console.log(`Bot is on ${senko.guilds.size} servers.`);
  await senko.user.setActivity("w/ Nakano");
};
