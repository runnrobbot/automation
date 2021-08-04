const Discord = require('discord.js')
const config = require('../config.json')
let copy = config.copyrightembed

exports.run = async (client, message, args ) => {

    if(!message.member.roles.cache.some(r=>["Verified"].includes(r.name)))
    return message.reply("You're not verified.")

    let send = new Discord.MessageEmbed()
    .setColor("GREEN")
    .setFooter(`${copy}`)
    .setTimestamp()
    .setAuthor("PUBLIC COMMANDS")
    .addField(".verify (username)", `Verify information user from roblox`)
    .addField(".aboutgroup", `Information about Sriwijaya Group`)
    .addField(".info (username)", `Getting information user from roblox`)
    .addField(".suggestion (message)", `Suggest about group for further update `)
    .addField(".databot", `About bot`)
    message.channel.send(send);
    
    var embed = new Discord.MessageEmbed()
    .setColor("GREEN")
    .setFooter(`${copy}`)
    .setTimestamp()
    .setAuthor("HIGH RANK COMMANDS")
    .addField(".shout (message)", `Give information about group to postgroup`)
    .addField(".rank (username) (namerank)", `Give the user new rank`)
    .addField(".logs", `Give information logs about the group`)
    message.channel.send(embed);
    

}