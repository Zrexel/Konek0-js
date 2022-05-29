const discord = require('discord.js');
const NSFW = require('@jcauman23/discordnsfw')
const nsfw = new NSFW();

module.exports = {
    name: "puppy",
    category: "NSFW",
    run: async (client, message, args) => {

        var errMessage = "This is not an NSFW Channel";
        if (!message.channel.nsfw) {
            message.react('💢');

            return message.reply(errMessage)
                .then(msg => {
                    msg.delete({ timeout: 3000 })
                })
        }

        async function puppy() {
            let te = await nsfw.hass();
            const msg = new discord.MessageEmbed()
                .setTitle('Anime puppy\'s')
                .setColor('RANDOM')
                .setImage(te)
                .setFooter("Requested by: " + message.member.displayName, message.author.displayAvatarURL({ dinamic: true }))
                .setTimestamp()
            return message.channel.send(msg)
        }
        puppy().catch(err => {
            if (err.name == 'Not Found') {
                return message.reply("Server Response Time Out");
            }
            else {
                const { errLogChannelID } = require('../../config.json');
                if(!errLogChannelID) return message.channel.send(err);
                message.react('❌')
                const logMessage = new discord.MessageEmbed()
                    .setTitle('Logs of CMD Errors | Crush | Broken')
                    .setColor('BLUE')
                    .setDescription(`${message.author.username} use CMD "***${puppy.name}***"\nFrom server: ${message.guild.name}\n${err}`)
                    .setTimestamp()
                client.channels.cache.get(errLogChannelID).send(logMessage);
            }
        })
    }
}