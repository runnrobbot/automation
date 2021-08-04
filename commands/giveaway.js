const ms = require('ms')
const Discord = require('discord.js')
const config = require('../config.json')
let copy = config.copyrightembed

exports.run = async (client, message, args) => {
    if(!args[0]) return message.reply("You forgot to specify a time!")
    if(client.giveaway.has(client.user.id)) return message.reply('Please finish the current giveaway or restart the bot before starting another one!')
    let time = ms(args[0])
    if(!time) return message.reply('That was not a valid time!')
    if(time > 10000000) return message.reply('That is too long!')

    let winners = args[1]
    if(!winners) return message.reply('You need to specify the amount of winners.')

    let item = args.join(" ").trim().slice(args[0].length).slice(args[1].length).slice(2)
    console.log(item)
    if(!item) return message.reply('You forgot to specify an item to giveaway!')
    if(item.length > 1300) return message.reply('Item may not exceed 1300 chars.')

    let m = await message.channel.send(`React to this message to have a chance of winning **${item}**!`)
    await m.react("🎉")

    client.giveaway.set(client.users.id, m.id)
    let filter = (reaction,users) => reaction.emoji.name === "🎉"
    let awaitingReactions = await m.awaitingReactions(filter, { time: time })

    if(!awaitingReactions.size) return message.channel.send('Nobody reacted, so nobody has won!')
    let users = awaitingReactions.first().users.filter(obj => obj.id !== client.user.id)

    if(!users.size) return message.reply('No users reacted!')
    let winner = users.random()
    message.channel.send(`The winner of the giveaway is ${winner.username}(${winner.id})`)

    if(client.giveaway.has(client.user.id)) {
        client.giveaway.delete(client.user.id)
    }
}