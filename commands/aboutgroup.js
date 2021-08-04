const roblox = require('noblox.js')
const Discord = require('discord.js')
const config = require('../config.json');
let copy = config.copyrightembed
let groupId = config.groupId

exports.run = async (client, message, args) => {

    if(!message.member.roles.cache.some(r=>["Verified"].includes(r.name)))
    return message.reply("You're not verified.")
    
    roblox.getShout(groupId).then(function (shout){
        console.log(shout.body)
        roblox.getRoles(groupId).map(roles => roles.name + " : " + roles.rank).then(function (roles){
            console.log(roles)
        })

        let send = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTimestamp()
        .setFooter(`${copy}`)
        .setImage(`https://cdn.discordapp.com/attachments/833980470676947020/870275305644916786/5342d87371c75a19c17e8dce0420b99e.png`, true)
        .setAuthor("INFORMATION GROUP")
        .setDescription("Sriwijaya Air Information")
        .addField("Group owner", `Marshallmcpe`)
        .addField("Description group", `Selamat Datang! Welcome to Sriwijaya! We're an airline based in Indonesia, therefore we mainly host our flight using Indonesian timezone.

        "Your Flying Partner"
        
        This airline is not affiliate with the real Sriwijaya Air.
        
        IATA : SJ
        ICAO : SJY
        Callsign : Sriwijaya
        
        Fleet:
        B737-400 (OUT SERVICE)
        B737-500 (IN SERVICE)
        B737-800 (IN SERVICE)
        B737-900 (ON DEVELOPMENT)
        
        Airports:
        Pinang Kampai Regional Airport (ON DEVELOPMENT)
        A.A. Bere Tallo Regional Airport (IN SERVICE)
        Adisucipto International Airport (ON DEVELOPMENT)
        Radin Inten II International Airport (ON DEVELOPMENT)
        Kertajati International Airport (ON DEVELOPMENT)`)
        .addField("Current shout", `${shout.body}`)
        .addField("Group link", `https://www.roblox.com/groups/7678633/SJ-Sriwijaya-Air#!/about`);

        message.channel.send(send)

    })
}