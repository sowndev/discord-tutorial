"use strict"
const { ApplicationCommandDataResolvable, Interaction, CacheType } = require("discord.js");

module.exports = {
    /**
     * The schema for the ping.
     * @type {ApplicationCommandDataResolvable}
     */
    command: {
        name: "ping",
        description: "Replies with Pong!",
    },

    /**
    * handler command ping.
    * @param { Interaction<CacheType>} interaction
    */
    execute: async (interaction) => {
        await interaction.reply("Pong!");
    }
}