exports.run = (senko, msg, args) => {
    if(!msg.member.hasPermission('MANAGE_GUILD')) return msg.channel.send('You don\'t have permission to add aliases');
    const [ action, cmd, ...aliases ] = args;
    if (!cmd) return msg.channel.send('Provide a command');
    if (!senko.commands.keyArray().includes(cmd)) return msg.channel.send('Cannot find the command you provided');
    if (action === 'set') {
      if (!aliases || !aliases.length) return msg.channel.send('Provide an aliases');
      if (!senko.settings.has(msg.guild.id, `aliases.${cmd}`)) senko.settings.set(msg.guild.id, [], `aliases.${cmd}`);
      for (const alias of aliases) {
        senko.settings.push(msg.guild.id, alias, `aliases.${cmd}`);
      }
      return msg.channel.send(`You can now use **${aliases.join(', ')}** to refer to **${cmd}**`);
    } else if (action === 'remove') {
      for (const alias of aliases) {
        senko.settings.removeFrom(msg.guild.id, `aliases.${cmd}`, alias);
      }
      return msg.channel.send(`Removed **${aliases.join(', ')}** from **${cmd}**`);
    } else if(action === 'list') {
      if (senko.settings.get(msg.guild.id, `aliases.${cmd}`) && senko.settings.get(msg.guild.id, `aliases.${cmd}`).length) {
        return msg.channel.send(`**${senko.settings.get(msg.guild.id, `aliases.${cmd}`).join(', ')}** refer to **${cmd}**`);
      } else {
        return msg.channel.send(`There are no aliases set for **${cmd}**`);
      }
    } else {
      return msg.channel.send('Cannot find the argument you provided');
    }
  };
  
  exports.help = {
    name: 'alias',
    description: 'Set alias for the command',
    usage: 'alias <set | remove | list> <command> <alias> [alias]'
  };