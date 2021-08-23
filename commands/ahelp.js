const Discord = require('discord.js')
const config = require('../config.json')
let copy = config.copyrightembed

exports.run = async (client, message, args ) => {

    if(!message.member.roles.cache.some(r=>["PON | Fans"].includes(r.name)))
    return message.reply("You're not verified.")

    let send = new Discord.MessageEmbed()
    .setColor("GREEN")
    .setFooter(`${copy}`)
    .setTimestamp()
    .setAuthor("PUBLIC COMMANDS")
    .addField(".info (username)", `Getting information user from roblox`)
    .addField(".databot", `Information about bot`)
    message.channel.send(send);
    
}
