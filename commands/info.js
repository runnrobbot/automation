const roblox = require('noblox.js')
const Discord = require('discord.js')
const config = require('../config.json');
let copy = config.copyrightembed
let groupId = config.groupId

exports.run = async (client, message, args) => {

    if(!message.member.roles.cache.some(r=>["Verified"].includes(r.name)))
    return message.reply("You're not verified.")
    
    client.extractDate = (dateObj) => {
        let month = dateObj.getMonth()
        let day = dateObj.getDate()
        let year = dateObj.getFullYear()
        return {
            month: month + 1,
            day: day,
            year: year
        }
    }

    const badgeInfo = await roblox.getBadgeInfo(1)
    let username = args[0]
    if(username) {
        roblox.getIdFromUsername(username).then(id => {
            roblox.getRankNameInGroup(groupId, id)
            .then(function(rank){

                if(id) {
                    roblox.getPlayerInfo(parseInt(id)).then(function(info){
                        let date = new Date(info.joinDate)
                        let dateInfo = client.extractDate(date)
                        let embed = new Discord.MessageEmbed()

                        .setColor("#4682B4")
                        .setURL(`https://roblox.com/users/${id}/profile`)
                        .setTimestamp()
                        .setThumbnail(`https://www.roblox.com/bust-thumbnail/image?userId=${id}&width=420&height=420&format=png`)

                        .addField("Username", info.username || 'N/A', true)
                        .addField("User ID", id || 'N/A', true)
                        .addField("Account age", `${info.age} days old` || 'N/A', true)
                        .addField("Register date", `${dateInfo.month}/${dateInfo.day}/${dateInfo.year}` || 'N/A', true)
                        .addField("Description", info.blurb || 'N/A', true)
                        .addField("Status", info.status || 'N/A', true)
                        .addField("Group rank", `${rank}`)
                        .addField("Profile link", `https://roblox.com/users/${id}/profile`)
                        .setFooter(`${copy}`)
                        message.channel.send({embed})
                    })
                }
            }).catch(function (err) {
                let errembed = new Discord.MessageEmbed()
                .setColor("RED")
                .setFooter(`${copy}`)
                .setTimestamp()
                .addField("Error", `Sorry, that user doesn't seem to exist, double check your spelling and try again!`)
                message.channel.send(errembed)
            });
        })
    } else {
        let errembed = new Discord.MessageEmbed()
        .setColor("RED")
        .setFooter(`${copy}`)
        .setTimestamp()
        .addField("Error", `Please provide a valid username, e.g '.info InuYasha194'.`)
        message.channel.send(errembed)
    }
}