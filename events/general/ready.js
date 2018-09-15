const pack = require('../../package.json');
const mongo = require('../../provider/mongo');
const {mongourl} = require('../../config.json');
exports.run = async senko => {
  await senko.guilds.forEach(guild => {
    senko.settings.ensure(guild.id, { prefix: 'sk-', aliases: {} });
  });
  const db = new mongo({url: mongourl});
  senko.db = db;
  console.log(`-----------------------------------`);
  console.log(`Version ${pack.version}`);
  console.log(`Made by ${pack.author}`);
  console.log(`Incomplete Alpha`);
  console.log(`[${senko.user.username}] is now online.`);
  console.log(`Bot is on ${senko.guilds.size} servers.`);
  await senko.user.setActivity("w/ Nakano");
};
