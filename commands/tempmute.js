const Discord = require("discord.js");
const ms = require("ms");
exports.run = async (senko, message, args) => {
    let mutetarget = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!mutetarget) await message.channel.send("`Error 404:` Couldn't find target")
    if (mutetarget.hasPermission("MANAGE_MESSAGES")) await message.channel.send("`Error 403:`No permission to mute.")
    else try{
        let mutedrole = message.guild.roles.find(`name`, "muted")
        if (!mutedrole) await message.channel.send("`Error 404:` Muted role does not exist, Creating new one...")
        if (!mutedrole){
            try{
                mutedrole = await message.guild.createRole({
                    name: "muted",
                    color: "#00000)",
                    permissions: []
                })
                message.guild.channel.forEach(async (channel, id) => {
                    await channel.overwritePermissions(mutedrole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false
                    });
                });
            }catch(e){
                await message.channel.send(`An error has occured!\`\`\`${e.stack}\`\`\``);
            }    
        }
    }
    finally{
        let mutetime = args[1];
    if(!mutetime) await message.channel.send("`Error 411:`Invalid Argument.");

    await(mutetarget.addRole(mutedrole.id));
    message.channel.send(`<@${mutetarget.id}> has been temporarily muted for ${ms(ms(mutetime))}`);

    setTimeout(function(){
        mutetarget.removeRole(mutedrole.id)
    }, ms(mutetime));
    }

    
}
    
    


exports.help = {
    name: 'tempmute',
    description: "Temporarily mutes a user",
    Usage: "usage [User] [Time]"
}