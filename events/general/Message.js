
exports.run = async (msg, senko) => {
    const prefix = senko.settings.get(msg.guild.id, 'prefix');
    if (msg.author.bot) return;
    if (!msg.guild) return msg.channel.send('Sorry, but DMs aren\'t supported. Don\'t go crying on me when you found a problem!');
    if (msg.content.indexOf(prefix) !== 0) return;

    function clean(text) {
        if (typeof (text) === "string")
            return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
        else
            return text;
    }

    let args = msg.content.slice(prefix.length).trim().split(/ +/g);
    let command = args.shift().toLowerCase();
  
    let aliasCmd;
    for(const aliases of Object.values(senko.settings.get(msg.guild.id, 'aliases'))) {
      if(aliases.find(key => key === command)) {
        const guildAliases = senko.settings.get(msg.guild.id, 'aliases'), cmdName = Object.keys(guildAliases).find(key => guildAliases[key] === aliases);
        aliasCmd = cmdName;
      }
    }

    let cmdFile = senko.commands.get(command) || senko.commands.get(aliasCmd);
    if (!cmdFile) return;
    cmdFile.run(senko, msg, args);

    if (msg.content.startsWith(prefix + "eval")) {
        if (msg.author.id !== pack.owner) return;
        try {
            const code = args.join(" ");
            let evaled = eval(code);

            if (typeof evaled !== "string")
                evaled = require("util").inspect(evaled);

            msg.channel.send(clean(evaled), {
                code: "xl"
            });
        } catch (err) {
            msg.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
        }
    }
}

exports.help = {
    name: 'message'
}