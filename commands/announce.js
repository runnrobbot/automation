const roblox = require('noblox.js')
const Discord = require('discord.js')
const config = require('../config.json');
let copy = config.copyrightembed
let groupId = config.groupId

exports.run = async (client, message, args) => {
    if (!message.channel.name.startsWith(`staff-bot-command`)) return message.channel.send(`You can't use the announce command outside of a <#844699139752460298> channel.`);
    
    if(!message.member.roles.cache.some(r=>["PON | Committee"].includes(r.name)) ) 
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
  .addField("Your announce has been sent!", `${suggestion}`);
  message.channel.send(newsuggestembed)
                                 
                                   
  let suggestionembed = new Discord.MessageEmbed()
  .setColor("GREEN")
  .setFooter(`${copy}`, `https://cdn.discordapp.com/attachments/870259172392992788/879430706164564008/PON_I.png`)
  .setTimestamp()
  .setAuthor("ANNOUNCEMENT | INFORMASI")
  .setDescription(`${suggestion}`)
  .addField("Sent by:", `${message.author}`)
   
  
  

  let suggestionchannel = message.guild.channels.cache.find(x => x.name === "announcement");
  suggestionchannel.send("@everyone",suggestionembed)
  } 
