const Discord = require('discord.js');
const { createWorker } = require('tesseract.js');
const config = require('../config.json');
let copy = config.copyrightembed
let groupId = config.groupId

exports.run = async (client, message, args) => {
    let link = args[0];

    if(message.attachments.size >= 1) {
        console.log(message.attachments.size)
        console.log(JSON.stringify(message.attachments))
        link = message.attachments.array()[0].url
    }
    if(!link) return message.channel.send("Format: `" + prefix + "teks [link]`");

    message.channel.send("Memproses... ").then(message => {
        const worker = createWorker({
            logger: m => {
                if (!m.progress) return;
                if (m.progress == 0 || m.progress == 1 || m.progress == 0.5) return;

                return message.edit(`Memproses, ${Math.floor(m.progress * 100)}%`);
            }
        });

        (async () => {
            await worker.load();
            await worker.loadLanguage('eng');
            await worker.initialize('eng');
            const { data: { text } } = await worker.recognize(link).catch(err => { message.edit("Link harus berupa gambar!")});

            message.edit(`Hasil: ${"`" + text + "`"}`);
            await worker.terminate();
        })();
    })
}