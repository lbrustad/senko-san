pack = require("./package.json")
exports.run = async (senko, message, args) => {
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
}

exports.help = {
    name: 'eval'
}
