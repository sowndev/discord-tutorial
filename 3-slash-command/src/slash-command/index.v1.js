"use strict"

const { Client, EmbedBuilder, Events } = require('discord.js');
const ping = require('./ping');
const infoChannel = require('./infoChannel');
/**
 * Handles shash command events.
 *
 * @param {Client} client - The Discord client instance.
 */
module.exports = (client) => {
    // register slash command on Bot join server
    // If bot join's server, you must be kick bot and invite again to see slash command while application while runing
    client.on(Events.ClientReady, async interaction => {
        await interaction.application?.commands.create({
            name: "ping",
            description: "Replies with Pong!",
        });

        await interaction.application?.commands.create({
            name: "info-channel",
            description: "Show info your channel!",
        });
    });


    // slash command handler
    client.on(Events.InteractionCreate, async (interaction) => {
        if (!interaction.isCommand()) return;

        // handle slash command /ping
        if (interaction.commandName === "ping") {
            return await interaction.reply("Pong!");
        }

        // handle slash command /info-channel
        if (interaction.commandName === "info-channel") {
            const messages = await interaction.channel.messages.fetch()
            const exampleEmbed = new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle(`Info channel ${interaction.channel}`)
                .setDescription("----------------------------")
                .addFields(
                    { name: 'Name', value: interaction.channel.name },
                    { name: 'ID', value: interaction.channel.id },
                    { name: 'Member count', value: `${interaction.guild.memberCount}` },
                    { name: 'Messages count', value: `${messages.size}` },
                    { name: 'Created At', value: `${interaction.channel.createdAt?.toLocaleDateString()}` },
                )
                .setTimestamp()
                .setFooter({ text: `${interaction.user.username}`, iconURL: `${interaction.user.avatarURL() ?? interaction.user.defaultAvatarURL}` });

            return interaction.channel.send({ embeds: [exampleEmbed] });
        }
    });
}