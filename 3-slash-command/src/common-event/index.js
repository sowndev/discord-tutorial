"use strict"
const { Client, Events } = require("discord.js");
const MessageCreateHandler = require("./MessageCreateHandler")
/**
 * Handles common events for a Discord client.
 *
 * @param {Client} client - The Discord client instance.
 */
module.exports = function commonEventHandler(client) {
  // welcome new user join channel
  client.on(Events.GuildMemberAdd, async (interaction) => {
    // channel to send message notification
    const channel = interaction.guild.channels.cache.find(
      (ch) => ch.name === "general"
    );

    if (!channel) return;
    // send message notification
    channel.send(`Welcome to the server, ${interaction}`);
  });

  // send message when user leave channel
  client.on(Events.GuildMemberRemove, async (interaction) => {
    // channel to send message notification
    const channel = interaction.guild.channels.cache.find(
      (ch) => ch.name === "general"
    );
    if (!channel || interaction.user.bot) return;
    // send message notification
    channel.send(`Goodbye, ${interaction}`);
  });


  // send message when user create channel
  client.on(Events.ChannelCreate, async (interaction) => {
    // channel to send message notification
    const channel = interaction.guild.channels.cache.find(
      (ch) => ch.name === "general"
    );

    if (!channel) return;
    // send message notification
    channel.send(`${interaction.client.user} just created new channel ${interaction}`);
  });

  // send message when user delete channel
  client.on(Events.ChannelDelete, async (interaction) => {
    // channel to send message notification
    const channel = interaction.guild.channels.cache.find(
      (ch) => ch.name === "general"
    );

    if (!channel) return;
    // send message notification
    channel.send(`${interaction.client.user} just deleted channel ${interaction}`);
  });

  // event user send message
  client.on(Events.MessageCreate, MessageCreateHandler);
  // client.on(Events.MessageCreate, (message) => {
  //   // check if bot's message
  //   if (message.author.bot) return;

  //   // user message
  //   if (message.content === "hello") {
  //     message.channel.send("Bot Hello!");
  //   }
  // });
}
