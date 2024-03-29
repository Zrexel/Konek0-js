const { Client, Message } = require('discord.js');
const discord = require("discord.js");
const { prefix } = require('../../config.json');
module.exports = {
    name: "clear",
    usage: ["Delete message count ```[command] + [number]```"],
    aliases: ["c", "purge"],
    category: "moderation",
    memberPermissions: ["MANAGE_MESSAGES"],
    botPermissions: ["VIEW_CHANNELS", "SEND_MESSAGES", "EMBED_LINKS", "ATTACH_FILES", "MANAGE_MESSAGES"],
    //Settings for command
    nsfw: false,
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        try {
            const command = [
                `bots\` - Delete messages sent by bots. (Ignore humans)`,
                `humans\` - Delete messages sent by humans. (Ignore bots)`,
                `embeds\` - Delete messages containing rich embeds.`,
                `files\` - Delete messages containing files/images/attachments.`,
                `mentions\` - Delete messages containing member/user/channel/role mentions.`,
                `pins\` - Delete messages which are pinned.`,
                `text\` - Delete messages cotaining only text. (Ignores files/images/attachents, embeds)`,
                `math\` <text> - Delete Messages containing text.`,
                `not\` <text> - Delete messages not containing text.`,
                `startswith\` <text> - Delete messages starts with text.`,
                `endswith\` <text> - Delete messages ends with text.`,
            ];

            const embd = new discord.MessageEmbed()
                .setColor("BLUE")
                .setTitle("Clear | Purge | Delete")
                .setDescription(
                    `Delete a number of messages from channel. (Ignores the pinned messages and limit is 100)`
                )
                .addField(
                    "Usage",
                    `\`${prefix}purge <amount>\` - Delete a number of messages.\n\`${prefix}purge <amount> --${command.join(
                        `\n\`${prefix}purge <amount> --`
                    )}`
                )
                .setFooter(`${prefix}purge, ${prefix}clear, ${prefix}delete, ${prefix}prune`);
            if (!args[0] || !args.length) return message.channel.send({embeds: [embd]});
            let amount = Number(args[0], 10) || parseInt(args[0]);
            if (isNaN(amount) || !Number.isInteger(amount))
                return message.channel.send(
                    "Please enter a number of messages to clear."
                );
            if (!args[1]) {
                try {
                    await message.delete();
                    await message.channel.bulkDelete(amount).then(async (m) => {
                        const embed = new discord.MessageEmbed()
                            .setColor("0x#00ffff")
                            .setDescription(
                                `✅  Cleared **${m.size}**/**${amount}** messages!`
                            );
                        message.channel
                            .send({embeds: [embed]})
                            .then((msg) => setTimeout(() => msg.delete(), 5000));
                    });
                } catch (e) {
                    console.log(e);
                    message.channel.send(
                        `You can only delete the messages which are not older than 14 days.`
                    );
                }
            } else if (args[1]) {
                let msg;
                let data;
                let embed;
                switch (args[1]) {
                    case "--bots":
                        msg = await message.channel.messages.fetch({ limit: amount });
                        data = [];
                        msg
                            .map((m) => m)
                            .forEach((ms) => {
                                if (ms.author.bot && !ms.pinned) data.push(ms);
                            });

                        try {
                            await message.delete();
                            await message.channel
                                .bulkDelete(data.length ? data : 1, true)
                                .then(async (m) => {
                                    embed = new discord.MessageEmbed()
                                        .setColor("0x#00ffff")
                                        .setDescription(
                                            `✅  Cleaed **${m.size}**/**${amount}** messages!`
                                        );
                                    message.channel
                                        .send({embeds: [embed]})
                                        .then((msg) => setTimeout(() => msg.delete(), 5000));
                                });
                        } catch (e) {
                            console.log(e);
                            message.channel.send(
                                `You can onyl delete the messages which are not older than 14 days.`
                            );
                        }
                        break;
                    case "--humans":
                        msg = await message.channel.messages.fetch({ limit: amount });
                        data = [];
                        msg
                            .map((m) => m)
                            .forEach((ms) => {
                                if (!ms.author.bot && !ms.pinned) data.push(ms);
                            });
                        try {
                            await message.channel
                                .bulkDelete(data.length ? data : 1, true)
                                .then(async (m) => {
                                    embed = new discord.MessageEmbed()
                                        .setColor("0x#00ffff")
                                        .setDescription(
                                            `✅  Cleared **${m.size}**/**${amount}** messages!`
                                        );
                                    message.channel
                                        .send({embeds: [embed]})
                                        .then((msg) => setTimeout(() => msg.delete(), 5000));
                                });
                        } catch (e) {
                            console.log(e);
                            Message.channel.send(
                                `You can only delete the messages which are not older than 14 days.`
                            );
                        }
                        break;
                    case "--embeds":
                        msg = await message.channel.channel.messages.fetch({ limit: amount });
                        data = [];
                        msg
                            .map((m) => m)
                            .forEach((ms) => {
                                if (ms.embeds.length && !ms.pinned) data.push(ms);
                            });
                        try {
                            await message.channel
                                .bulkDelete(data.length ? data : 1, true)
                                .then(async (m) => {
                                    embed = new discord.MessageEmbed()
                                        .setColor("0x#00ffff")
                                        .setDescription(
                                            `✅  Cleared **${m.size}**/**${amount}** messages!`
                                        );
                                    await client.modlogs(
                                        message,
                                        `Purged ${m.size} messages\nModerator: **${message.author.tag} | ${message.author.id}**`
                                    );
                                    message.channel
                                        .send({embeds: [embed]})
                                        .then((msg) => setTimeout(() => msg.delete(), 5000));
                                });
                        } catch (e) {
                            console.log(e);
                            message.channel.send(
                                `You can only delete the messages which are not older than 14 days.`
                            );
                        }
                        break;
                    case "--files":
                        msg = await message.channel.channel.messages.fetch({ limit: amount });
                        data = [];
                        msg
                            .map((m) => m)
                            .forEach((ms) => {
                                if (ms.embeds.length && !ms.pinned) data.push(ms);
                            });
                        try {
                            await message.channel
                                .bulkDelete(data.length ? data : 1, true)
                                .then(async (m) => {
                                    embed = new discord.MessageEmbed()
                                        .setColor("0x#00ffff")
                                        .setDescription(
                                            `✅  Cleared **${m.size}**/**${amount}** messages!`
                                        );
                                    await client.modlogs(
                                        message,
                                        `Purged ${m.size} messages\nModerator: **${message.author.tag} | ${message.author.id}**`
                                    );
                                    message.channel
                                        .send({embeds: [embed]})
                                        .then((msg) => setTimeout(() => msg.delete(), 5000));
                                });
                        } catch (e) {
                            console.log(e);
                            message.channel.send(
                                `You can only delete the messages which are not older than 14 days.`
                            );
                        }
                        break;
                    case "--text":
                        msg = await message.channel.channel.messages.fetch({ limit: amount });
                        data = [];
                        msg
                            .map((m) => m)
                            .forEach((ms) => {
                                if (ms.embeds.length && !ms.pinned) data.push(ms);
                            });
                        try {
                            await message.channel
                                .bulkDelete(data.length ? data : 1, true)
                                .then(async (m) => {
                                    embed = new discord.MessageEmbed()
                                        .setColor("0x#00ffff")
                                        .setDescription(
                                            `✅  Cleared **${m.size}**/**${amount}** messages!`
                                        );
                                    await client.modlogs(
                                        message,
                                        `Purged ${m.size} messages\nModerator: **${message.author.tag} | ${message.author.id}**`
                                    );
                                    message.channel
                                        .send({embeds: [embed]})
                                        .then((msg) => setTimeout(() => msg.delete(), 5000));
                                });
                        } catch (e) {
                            console.log(e);
                            message.channel.send(
                                `You can only delete the messages which are not older than 14 days.`
                            );
                        }
                        break;
                    case "--mentions":
                        msg = await message.channel.channel.messages.fetch({ limit: amount });
                        data = [];
                        msg
                            .map((m) => m)
                            .forEach((ms) => {
                                if (ms.embeds.length && !ms.pinned) data.push(ms);
                            });
                        try {
                            await message.channel
                                .bulkDelete(data.length ? data : 1, true)
                                .then(async (m) => {
                                    embed = new discord.MessageEmbed()
                                        .setColor("0x#00ffff")
                                        .setDescription(
                                            `✅  Cleared **${m.size}**/**${amount}** messages!`
                                        );
                                    await client.modlogs(
                                        message,
                                        `Purged ${m.size} messages\nModerator: **${message.author.tag} | ${message.author.id}**`
                                    );
                                    message.channel
                                        .send({embeds: [embed]})
                                        .then((msg) => setTimeout(() => msg.delete(), 5000));
                                });
                        } catch (e) {
                            console.log(e);
                            message.channel.send(
                                `You can only delete the messages which are not older than 14 days.`
                            );
                        }
                        break;
                    case "--pins":
                        msg = await message.channel.channel.messages.fetch({ limit: amount });
                        data = [];
                        msg
                            .map((m) => m)
                            .forEach((ms) => {
                                if (ms.embeds.length && !ms.pinned) data.push(ms);
                            });
                        try {
                            await message.channel
                                .bulkDelete(data.length ? data : 1, true)
                                .then(async (m) => {
                                    embed = new discord.MessageEmbed()
                                        .setColor("0x#00ffff")
                                        .setDescription(
                                            `✅  Cleared **${m.size}**/**${amount}** messages!`
                                        );
                                    await client.modlogs(
                                        message,
                                        `Purged ${m.size} messages\nModerator: **${message.author.tag} | ${message.author.id}**`
                                    );
                                    message.channel
                                        .send({embeds: [embed]})
                                        .then((msg) => setTimeout(() => msg.delete(), 5000));
                                });
                        } catch (e) {
                            console.log(e);
                            message.channel.send(
                                `You can only delete the messages which are not older than 14 days.`
                            );
                        }
                        break;
                    case "--match":
                        msg = await message.channel.channel.messages.fetch({ limit: amount });
                        data = [];
                        msg
                            .map((m) => m)
                            .forEach((ms) => {
                                if (ms.embeds.length && !ms.pinned) data.push(ms);
                            });
                        try {
                            await message.channel
                                .bulkDelete(data.length ? data : 1, true)
                                .then(async (m) => {
                                    embed = new discord.MessageEmbed()
                                        .setColor("0x#00ffff")
                                        .setDescription(
                                            `✅  Cleared **${m.size}**/**${amount}** messages!`
                                        );
                                    await client.modlogs(
                                        message,
                                        `Purged ${m.size} messages\nModerator: **${message.author.tag} | ${message.author.id}**`
                                    );
                                    message.channel
                                        .send({embeds: [embed]})
                                        .then((msg) => setTimeout(() => msg.delete(), 5000));
                                });
                        } catch (e) {
                            console.log(e);
                            message.channel.send(
                                `You can only delete the messages which are not older than 14 days.`
                            );
                        }
                        break;
                    case "--not":
                        msg = await message.channel.channel.messages.fetch({ limit: amount });
                        data = [];
                        msg
                            .map((m) => m)
                            .forEach((ms) => {
                                if (ms.embeds.length && !ms.pinned) data.push(ms);
                            });
                        try {
                            await message.channel
                                .bulkDelete(data.length ? data : 1, true)
                                .then(async (m) => {
                                    embed = new discord.MessageEmbed()
                                        .setColor("0x#00ffff")
                                        .setDescription(
                                            `✅  Cleared **${m.size}**/**${amount}** messages!`
                                        );
                                    await client.modlogs(
                                        message,
                                        `Purged ${m.size} messages\nModerator: **${message.author.tag} | ${message.author.id}**`
                                    );
                                    message.channel
                                        .send({embeds: [embed]})
                                        .then((msg) => setTimeout(() => msg.delete(), 5000));
                                });
                        } catch (e) {
                            console.log(e);
                            message.channel.send(
                                `You can only delete the messages which are not older than 14 days.`
                            );
                        }
                        break;
                    case "--startwidth":
                        msg = await message.channel.channel.messages.fetch({ limit: amount });
                        data = [];
                        msg
                            .map((m) => m)
                            .forEach((ms) => {
                                if (ms.embeds.length && !ms.pinned) data.push(ms);
                            });
                        try {
                            await message.channel
                                .bulkDelete(data.length ? data : 1, true)
                                .then(async (m) => {
                                    embed = new discord.MessageEmbed()
                                        .setColor("0x#00ffff")
                                        .setDescription(
                                            `✅  Cleared **${m.size}**/**${amount}** messages!`
                                        );
                                    await client.modlogs(
                                        message,
                                        `Purged ${m.size} messages\nModerator: **${message.author.tag} | ${message.author.id}**`
                                    );
                                    message.channel
                                        .send({embeds: [embed]})
                                        .then((msg) => setTimeout(() => msg.delete(), 5000));
                                });
                        } catch (e) {
                            console.log(e);
                            message.channel.send(
                                `You can only delete the messages which are not older than 14 days.`
                            );
                        }
                        break;
                    case "--endswith":
                        msg = await message.channel.channel.messages.fetch({ limit: amount });
                        data = [];
                        msg
                            .map((m) => m)
                            .forEach((ms) => {
                                if (ms.embeds.length && !ms.pinned) data.push(ms);
                            });
                        try {
                            await message.channel
                                .bulkDelete(data.length ? data : 1, true)
                                .then(async (m) => {
                                    embed = new discord.MessageEmbed()
                                        .setColor("0x#00ffff")
                                        .setDescription(
                                            `✅  Cleared **${m.size}**/**${amount}** messages!`
                                        );
                                    await client.modlogs(
                                        message,
                                        `Purged ${m.size} messages\nModerator: **${message.author.tag} | ${message.author.id}**`
                                    );
                                    message.channel
                                        .send({embeds: [embed]})
                                        .then((msg) => setTimeout(() => msg.delete(), 5000));
                                });
                        } catch (e) {
                            console.log(e);
                            message.channel.send(
                                `You can only delete the messages which are not older than 14 days.`
                            );
                        }
                        break;
                    default:
                        return message.channel.send({embeds: [embd]});
                }
            } else {
                return message.channel.send(`An error occoured.`);
            }
        } catch (error) {
            console.log(error);
            message.channel.send(`An error occurred: \`${error}\``);
        }
    },
};