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
    // version 2
    // register slash command on Bot join server
    // If bot join's server, you must be kick bot and invite again to see slash command while application while runing
    client.on(Events.ClientReady, async interaction => {
        await interaction.application?.commands.create(ping.command);
        await interaction.application?.commands.create(infoChannel.command);
    });

    client.on(Events.InteractionCreate, async (interaction) => {
        if (!interaction.isCommand()) return;

        // handle slash command /ping
        switch (interaction.commandName) {
            case ping.command.name:
                return await ping.execute(interaction);

            case infoChannel.command.name:
                return await infoChannel.execute(interaction);

            default:
                return await interaction.reply("Command not found!");

        }
    })
}