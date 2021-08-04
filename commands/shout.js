const roblox = require('noblox.js')
const Discord = require('discord.js')
const config = require('../config.json');
let copy = config.copyrightembed
let groupId = config.groupId

exports.run = async (client, message, args) => {
    if(!message.member.roles.cache.some(r=>["HIGH RANK"].includes(r.name)) )
    if (!args) {
        return;
        message.reply('Please specify a message to shout.')
    }
    const shoutMSG = args.join(" ");

    roblox.shout(groupId, shoutMSG)
    .then(function() {
        let replyshoutembed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setFooter(`${copy}`)
        .setTimestamp()
        .addField("Shouted:", `${shoutMSG}`)
        .addField("Group:", `Fly Kier`)
        let shoutembed = new Discord.MessageEmbed()
        .setColor("#4682B4")
        .setFooter(`${copy}`)
        .setTimestamp()
        .addField("Action:", `Shout commands`)
        .addField("Description", `${shoutMSG}`)
        .addField("Shout by", `${message.author}`)
        .setThumbnail(`https://www.roblox.com/bust-thumbnail/image?userId=${1226578}&width=420&height=420&format=png`)

        let shoutchannels = message.guild.channels.cache.find(x => x.name === "automation-logs");
        shoutchannels.send(shoutembed);
        message.channel.send(replyshoutembed);
        console.log(`Shouted ${shoutMSG}`)
    })
    .catch(function(error) {
        console.log(`Shout error: ${error}`)
        let shouterr = new Discord.MessageEmbed()
        .setColor("RED")
        .setTimestamp()
        .setFooter(`${copy}`)
        .addField("Shout failed!", `${error}`)
        .addField("Please report to CoreAvis ASAP!", `CoreAvis#7489`)
        message.channel.send(shouterr);
    });
}