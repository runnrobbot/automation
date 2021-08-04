const countdown = require('countdown')
const Discord = require('discord.js')
const config = require('../config.json')
let copy = config.copyrightembed

exports.run = async (client, message, args) => {
    
    if(!message.member.roles.cache.some(r=>["Verified"].includes(r.name)))
    return message.reply("You're not verified.")

    let time = countdown(client.uptime, 0,countdown.DAYS|countdown.HOURS|countdown.MINUTES|countdown.SECONDS)
    let embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setFooter(`${copy}`)
    .setTimestamp()
    .setDescription(`Days: **${time.days}**\nHours: **${time.hours}**\nMinutes: **${time.minutes}**\nSeconds: **${time.seconds}**`)
    message.channel.send(embed)

}