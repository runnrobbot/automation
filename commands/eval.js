const roblox = require('noblox.js')
const Discord = require('discord.js')
const config = require('../config.json');
let copy = config.copyrightembed
let groupId = config.groupId

exports.run = async (client, message, args) => {
    const warningTokenMessage = ["Kepo cok", "Tertipu kamu bangsat"]
    if (message.author.id !== '709688802666610708') return;
    try {
        let codein = args.join(' ');
        let code = eval(codein);

        if(!codein) return;
        if(codein.includes(`SECRET`)){
            code = warningTokenMessage[Math.floor(Math.random() * warningTokenMessage.length)];
            console.log(`${message.author.tag} use this eval to against the tokens and privacy.`)
        } else {
            code = eval(code);
        }
        if (typeof code !== 'string')
        code = require(`util`).inspect(code, { depth: 0});
        let embed = new Discord.MessageEmbed()
        .setAuthor('Evaluate')
        .setColor('RANDOM')
        .setTimestamp()
        .setFooter(`${copy}`)
        .addField('📥 Input', `\`\`\`js\n${codein}\`\`\``)
        .addField('📤 Output', `\`\`\`js\n${code}\n\`\`\``)
        message.channel.send(embed)
        console.log("success")
    } catch(e) {
        message.channel.send(`\`\`\`js\n${e}\n\`\`\``);
    }
}