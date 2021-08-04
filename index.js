const fs = require('fs');
const roblox = require('noblox.js');
const Enmap = require('enmap');
const admin = require("firebase-admin");
const Discord = require('discord.js');
const config = require('./config.json');
const client = new Discord.Client();

client.on('ready', () => {
    console.log('Bot nyala');
    client.user.setActivity(`.ahelp`, { type: `STREAMING`});
})

// command handler 
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.events = new Discord.Collection();
// ---------------

// login session (roblox)
var cookie = config.cookie;
function login() {
    return roblox.setCookie(cookie);
}

login()
     .then(function() {
         console.log('Akun login')
     })
     .catch(function(error) {
         console.log(`Akun login error: ${error}`)
     });

var serviceAccount = require("./settings/serviceAccountKey.json");
let app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: `${config.firebase_url}`
})

// -----------------

fs.readdir("./commands/", (err, files) => {
    
    if (err) return console.log(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require(`./commands/${file}`);
        console.log("Commands berhasil di load" + file)
        let commandName = file.split(".")[0];
        client.commands.set(commandName, props);
    });
});

// Events handler
fs.readdir('./events/', (err, files) => {
    if (err) console.log(err);
    files.forEach(file => {
        let eventFunc = require(`./events/${file}`);
        console.log("Commands berhasil di load" + file)
        let eventName = file.split(".")[0];
        client.on(eventName, (...args) => eventFunc.run(client, ...args));
    });
});

client.login(config.token);