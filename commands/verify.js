const roblox = require('noblox.js')
const Discord = require('discord.js')
const snekfetch = require('snekfetch')
const config = require('../config.json');
let copy = config.copyrightembed
let groupId = config.groupId

exports.run = async (client, message, args) => {
  const passengerRole = message.guild.roles.cache.find(role => role.name === `PASSENGER`);
  const verifiedRole = message.guild.roles.cache.find(role => role.name === `Verified`);
  const verificationCode = ['apple', 'rain', 'dog', 'cat', 'food','yum','pizza','raindrop','snow','birthday','cake','burger','soda','ice','no','yes','orange','pear','plum'];
  
  
     if (!message.guild.members.cache.get(client.user.id).hasPermission("MANAGE_NICKNAMES")){
      return message.channel.send(`Sorry ${message.author}, but I don't have permissions to manage nicknames.\n**Please contact someone to change my permissions so I can manage nicknames!**`).then(message => message.delete(5000));
    }

    if (!message.guild.members.cache.get(client.user.id).hasPermission("CHANGE_NICKNAME")){
      return message.channel.send(`Sorry ${message.author}, but I don't have permissions to change nicknames.\n**Please contact someone to change my permissions so I can change nicknames!**`).then(message => message.delete(5000));
    }

    if (!verifiedRole){
      return message.channel.send(`Sorry ${message.author}, but this guild is missing the \`Verified\` role!\n**Please contact someone to add the role!**`).then(message => message.delete(5000));
    }

    if (message.member.roles.cache.some(r=>["Verified"].includes(r.name)) ){
      return message.channel.send(`Sorry ${message.author}, but you're already verified!`).then(message => message.delete(5000));
    }

    if (!args[0]){
      return message.channel.send(`Sorry ${message.author}, but you need to provide me with a ROBLOX username.`).then(message => message.delete(5000));
    }

    var { body } = await snekfetch.get(`http://api.roblox.com/users/get-by-username?username=${args[0]}`)

    if (body.errorMessage === "User not found"){
      return message.channel.send(`Sorry ${message.author}, but could you please provide me with a real ROBLOX username?`).then(message => message.delete(5000));
    }

    var verificationPart1 = verificationCode[Math.floor(Math.random() * verificationCode.length)];
    var verificationPart2 = verificationCode[Math.floor(Math.random() * verificationCode.length)];
    var verificationPart3 = verificationCode[Math.floor(Math.random() * verificationCode.length)];
    var verificationPart4 = verificationCode[Math.floor(Math.random() * verificationCode.length)];

    const statusCode = [`FK-${verificationPart1} ${verificationPart2} ${verificationPart3} ${verificationPart4}`]
    const token = statusCode[Math.floor(Math.random() * statusCode.length)];

    const goodMessage = new Discord.MessageEmbed()
    .setColor("GREEN")
    .setTimestamp()
    .setFooter(`${copy}`)
    .setAuthor(`Verification`, `https://media.discordapp.net/attachments/598204662436462615/692447658450616400/c8579ec10f22d685ab5bc469fe58750d.png`)
    .setDescription(`Profile: https://web.roblox.com/users/${body.Id}/profile\n\nReplace your current status with: **${token}**\n\n\n` + "**Chat `done` in __here__ to me when you've changed your status successfully!**")

    const location = await message.author.send(goodMessage).then(msg => msg.channel).catch(() => {
      return message.channel.send(`Sorry ${message.author}, but I couldn't direct message you!`).then(message => message.delete(5000));
    })
    const timeCollectionThing = { max: 1, time: 300000, errors: ['time'] };
    const collected = await location.awaitMessages(response => message.author === response.author && response.content === 'done', timeCollectionThing).catch(() => null);
    if (!collected) {
      return message.channel.send(`Sorry ${message.author}, but I've waited patiently for five minutes and you haven't chatted **\`done\`**--I've cancelled the verification process.`).then(message => message.delete(5000));
    }
    const blurb1 = await roblox.getStatus(await roblox.getIdFromUsername(args[0]));
    const blurb2 = await roblox.getBlurb(await roblox.getIdFromUsername(args[0]));
    var nicknames = await roblox.getIdFromUsername(args[0]);
    var nicknames2 = await roblox.getUsernameFromId(nicknames);
    var okayLetsTry = await roblox.getIdFromUsername(args[0]);
    var firstCheck = await roblox.getRankInGroup(groupId, okayLetsTry)

    if (blurb1 === token || blurb2 === token){
      await message.member.roles.add(verifiedRole);
      await message.member.roles.add(passengerRole);
      await message.member.setNickname(`${firstCheck} | ${nicknames2}`);
      let welcomeMessage = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setTimestamp()
      .setFooter(`${copy}`)
      .setAuthor("Verification Complete")
      .setDescription("Hey, there! Welcome to Fly Kier, thanks for joining our server and dont forget to join our flight too!");
      return message.author.send(welcomeMessage)
    }else{
      return message.channel.send(`Sorry ${message.author}, but I couldn't find the code on your blurb or status.`).then(message => message.delete(5000));
    }
  }
  
