const Discord = require("discord.js")

const { version } = require("discord.js");
const moment = require("moment");
const m = require("moment-duration-format");
const ms = require("ms")

let os = require('os')
let cpuStat = require("cpu-stat")

module.exports = {
    name: "botinfo",
    usage: ["Info about Konek0 ```[command]```"],
    aliases: [],
    category: "utility",
    memberPermissions: [],
    botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    //Settings for command
    nsfw: false,
    run: async (client, message, args) => {
        cpuStat.usagePercent(function (err, percent, seconds) {
            if (err) {
                return console.log(err);
            }
            const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
            const botinfo = new Discord.MessageEmbed()
                .setAuthor(client.user.username)
                .setTitle("__**Stats:**__")
                .setColor("RANDOM")
                .addField("⏳ Mem Usage", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`, true)
                .addField("⌚️ Uptime ", `${duration}`, true)
                .addField("📁 Users", `${client.users.cache.size}`, true)
                .addField("📁 Servers", `${client.guilds.cache.size}`, true)
                .addField("📁 Channels ", `${client.channels.cache.size}`, true)
                .addField("👾 Discord.js", `v${version}`, true)
                .addField("🤖 Node", `${process.version}`, true)
                .addField("🤖 CPU", `\`\`\`md\n${os.cpus().map(i => `${i.model}`)[0]}\`\`\``)
                .addField("🤖 CPU usage", `\`${percent.toFixed(2)}%\``, true)
                .addField("🤖 Arch", `\`${os.arch()}\``, true)
                .addField("💻 Platform", `\`\`${os.platform()}\`\``, true)
                .addField("🎴API Latency", `${(client.ws.ping)}ms`)
                .addField("👑 Owner", "『♛ 𝕰𝖒𝖕𝖊𝖗𝖔𝖗 ♛』#0398", true)
                .setTimestamp()
            return message.channel.send({embeds: [botinfo]})
        });
    }
};