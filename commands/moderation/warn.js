exports.run = async (senko, msg, args) => {


    if (!msg.member.hasPermission('MANAGE_MESSAGES')) return msg.channel.send('`Error 403`: No permission to use this command.');


    var user = msg.guild.members.find(u => u.id === args[0] || u.toString() === args[0] || u.user.username === args[0]);
    if (!user) return msg.channel.send("`Error 404`: Target not found.");

    let reason = args.slice(1).join(" ");
    if (!reason) reason = 'No reason';

    senko.db.giveWarning({guild: msg.guild.id, user: user.id, moderator: msg.author.id, reason: reason});
    msg.channel.send(`<@${user}> has been warned!`);
    
}

exports.help = {
    name: 'warn',
    usage: 'warn <@user|usern|userID> [Reason]'
}