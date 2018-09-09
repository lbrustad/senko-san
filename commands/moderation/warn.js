exports.run = async (senko, msg, args) => {


    if (!msg.member.hasPermission('KICK_MEMBERS')) return msg.channel.send('Invalid premissions you must at least have `KICK_MEMBERS` permission to use this command');


    var user = msg.guild.members.find(u => u.id === args[0] || u.toString() === args[0] || u.user.username === args[0]);
    if (!user) return msg.channel.send("Invalid/Missing user");

    let reason = args.slice(1).join(" ");
    if (!reason) reason = 'No reason provided';

    senko.db.giveWarning({guild: msg.guild.id, user: user.id, moderator: msg.author.id, reason: reason});
    msg.channel.send("User is warned!");
    
}

exports.help = {
    name: 'warn',
    usage: 'warn <@user|usern|userID> [Reason]'
}