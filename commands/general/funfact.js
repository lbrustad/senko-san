const {RichEmbed} = require('discord.js');
const UserData = new Map();
const moment = require('moment');
const m = require('moment-duration-format');
const VOTE_DURATION = 7200000;
module.exports.run = async (senko, msg, args) => {


    var User = UserData.get(msg.author.id);
    if (!User) {

        User = {
            last_vote: null,
            last_tip: 0,
            last_fact: []
        }

        UserData.set(msg.author.id, User);
    }

    if (!args[0]) {
        var data = await senko.db.fetchFacts({random: true});
        if (User.last_fact.length == 0 || User.last_fact == undefined) User.last_fact.push(data);
        if (User.last_fact.length > 0) {
            User.last_fact = [];
            User.last_fact.push(data);
        }
        
        console.log(User);
        var emb = new RichEmbed()
        .setDescription(data.text)
        .setFooter(`L: ${data.like} | D: ${data.dislike} | Tags: ${data.flags.join(", ")}`)
        msg.channel.send(emb);
        if (User.last_tip > 3) User.last_tip = 0;
        if (User.last_tip > 2) msg.channel.send(`\`TIP:\` You can do \`${senko.settings.get(msg.guild.id).prefix}funfact vote <l/d>\` to like or dislike current fact`);
        User.last_tip++;
    } else if (args[0] === 'vote') {

        
        if (User.last_fact.length < 1 || User.last_fact == undefined) return msg.channel.send("You did not look at any fact yet");
        if (recived(msg.author.id)){
            return msg.channel.send(`Wow you already voted please wait \`${moment.duration(nextVote(msg.author.id)).format("hh [hours] mm [minutes]")}\``)
        }

        switch (args[1]) {

            case 'l':
            await senko.db.giveVote({id: User.last_fact[0].id, like: true})
            User.last_vote = Date.now();
            msg.channel.send("👍")
            break;

            case 'd':
            await senko.db.giveVote({id: User.last_fact[0].id, dislike: true})
            User.last_vote = Date.now();
            msg.channel.send("👍")
            break;

            default:
            return msg.channel.send("Invalid option choose between l or d")
        }
    }



}


function recived(id){
    var User = UserData.get(id);
    if (!User.last_vote) return false;
    return Date.now() - (VOTE_DURATION < User.last_vote)
}

function nextVote(id){
    var User = UserData.get(id);
    return VOTE_DURATION - (Date.now() - User.last_vote);
}

module.exports.help = {
    name: "funfact",
    description: "Get a funfact"
}