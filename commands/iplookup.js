const Discord = require('discord.js');
const iplookup = require('ipapi.co');
const config = require('../config.json');
let copy = config.copyrightembed

exports.run = async (client, message, args) => {
    
    if(!message.member.roles.cache.some(r=>["Verified"].includes(r.name)))
    return message.reply("You're not verified.")
    if(!args[0]) return message.channel.send('You forgot an IP!')

    iplookup.location(function(data) {
        if(data.error || data.reserved) return message.reply("Could not find info about that ip address.")

        let embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setFooter(`${copy}`)
        .setTimestamp()
        .setTitle(data.ip)
        .addField("City", data.city, true)
        .addField(`Region`, data.region,true)
        .addField(`Region Code`, data.region_code,true)
        .addField('Country', data.country_name,true)
        .addField(`Capital`, data.country_capital,true)
        .addField(`Europe`, data.in_eu === true ? "yes" : "no",true)
        .addField(`Postal Code`, data.postal,true)
        .addField(`Latitude`, data.latitude,true)
        .addField(`Longitude`, data.longitude,true)
        .addField(`Orginaziation`, data.org,true)
        message.channel.send(embed)
    })
}