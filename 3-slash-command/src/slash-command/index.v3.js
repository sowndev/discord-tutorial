"use strict"
const fs = require('node:fs');
const path = require('node:path');
const { Client, Events } = require('discord.js');

const commandFolderPath = "src/slash-command";
const regexIndex = /^index.*\.js$/;

const slashCommands = fs.readdirSync(commandFolderPath)
    .filter(filePath => !regexIndex.test(filePath))
    .map(filePath => require(path.join(__dirname, filePath)))

/**
 * Handles shash command events.
 *
 * @param {Client} client - The Discord client instance.
 */
module.exports = (client) => {
    /**
     * Handles shash command events.
     *
     * @param {Client} interaction - The Discord client instance.
     */
    // version 3. auto import slash command
    // register slash command on Bot join server
    // If bot join's server, you must be kick bot and invite again to see slash command while application while runing
    client.on(Events.ClientReady, async interaction => {
        for (const slashCommand of slashCommands) {
            await interaction.application?.commands.create(slashCommand.command);
        }
    });

    client.on(Events.InteractionCreate, async (interaction) => {
        if (!interaction.isCommand()) return;

        for (const slashCommand of slashCommands) {
            if (slashCommand.command?.name === interaction.commandName) {
                return await slashCommand.execute(interaction);
            }
        }
        return await interaction.reply("Command not found!");
    })
}
