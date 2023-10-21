"use strict"
const { ApplicationCommandDataResolvable, Interaction, CacheType, EmbedBuilder } = require("discord.js");

module.exports = {
    /**
     * The schema for the ping.
     * @type {ApplicationCommandDataResolvable}
     */
    command: {
        name: "info-channel",
        description: "Show info your channel!",
    },

    /**
    * handler command ping.
    * @param { Interaction<CacheType>} interaction
    */
    execute: async (interaction) => {
        const messages = await interaction.channel.messages.fetch()
        const exampleEmbed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle(`Info channel ${interaction.channel}`)
            .setDescription("----------------------------")
            .addFields(
                { name: 'Name', value: interaction.channel.name, inline: true },
                { name: 'ID', value: interaction.channel.id },
                { name: 'Member count', value: `${interaction.guild.memberCount}` },
                { name: 'Messages count', value: `${messages.size}` },
                { name: 'Created At', value: `${interaction.channel.createdAt?.toLocaleDateString()}` },
            )
            .setTimestamp()
            .setFooter({ text: `${interaction.user.username}`, iconURL: `${interaction.user.avatarURL() ?? interaction.user.defaultAvatarURL}` });

        return interaction.reply({ embeds: [exampleEmbed] });
    }
}