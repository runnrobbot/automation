const roblox = require('noblox.js')
const Discord = require('discord.js')
const config = require('../config.json')
let copy = config.copyrightembed

exports.run = async (client, message, args) => {

    if(!message.member.roles.cache.some(r=>["PON | Fans"].includes(r.name)))
    return message.reply("You're not verified.")

    var firstembed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle(`__**General Information**__`)
    .setTimestamp()
    .setFooter(`${copy}`)
    .setDescription(`Automation is a automation Discord-ROBLOX Intergrated service`)
    .addField("Supporting Users", `${client.users.cache.size}`, true)
    .addField("Memory Usage", `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB`, true)
    await message.channel.send(firstembed)
}
