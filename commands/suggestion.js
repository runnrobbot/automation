const roblox = require('noblox.js')
const Discord = require('discord.js')
const config = require('../config.json');
let copy = config.copyrightembed
let groupId = config.groupId

exports.run = async (client, message, args) => {
    if (!message.channel.name.startsWith(`commands-chat`)) return message.channel.send(`You can't use the suggestion command outside of a <#864857177758892073> channel.`);
    
    if(!message.member.roles.cache.some(r=>["Verified", "HIGH RANK"].includes(r.name)) ) 
        return message.reply("You can't use this command, you need verify for get access.");
        if (!args) { 
            return;
            message.reply('Please specify a message.')
        }
  var suggestion = args.join(" ");
  let newsuggestembed = new Discord.MessageEmbed()
  .setColor("GREEN")
  .setFooter(`${copy}`)
  .setTimestamp()
  .addField("Your suggestion received!", `${suggestion}`);
  message.channel.send(newsuggestembed)
                                 
                                   
  let suggestionembed = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setFooter(`${copy}`)
  .setTimestamp()
  .addField("New suggestion:", `${suggestion}`)
  .addField("Suggestion by:", `${message.author}`)
  
  

  let suggestionchannel = message.guild.channels.cache.find(x => x.name === "upcoming-suggestion");
  suggestionchannel.send(suggestionembed).then(x => {
  
  
  const filter2 = (reaction, user) => reaction.emoji.name === '👎' && reaction.emoji.name === '👍' && user.id !== `${client.user.id}`
                                 x.react("👎")
                                 x.react("👍")
                                 x.awaitReactions(filter2, {
                                    time: 172800000 
                                })
                                .then(collected => {
                                    const users1 = x.reactions.get("👎").users;
                                    const users2 = x.reactions.get("👍").users;
                                    const list1 = users1.array().filter(u => u.id !== client.user.id);
                                    const list2 = users2.array().filter(u => u.id !== client.user.id);
                                   x.edit("", {
                                     embed: new Discord.MessageEmbed()
                                     .setColor("RANDOM")
                                     .setFooter(`${copy}`)
                                     .setTimestamp()
                                     .addField("New suggestion:", `${suggestion}`)
                                     .addField("Suggestion by:", `${message.author}`)
                                     .addField("Results:", `${list1.leght} 👍 || ${list2.leght} 👎 `)
                                     
                                   });
  })
  })
  } 
