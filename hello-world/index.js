const { Client, Events, IntentsBitField, Partials } = require("discord.js"); // import discord module
require("dotenv").config(); // import dotenv module
const token = process.env.TOKEN; // get token from environment variable

// Create a new client instance

const client = new Client({
  intents: [
    // Enable specific intents
    IntentsBitField.Flags.Guilds, // Guilds is mean server on discord
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.DirectMessages,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildMessageReactions,
    IntentsBitField.Flags.DirectMessages,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.GuildInvites,
  ],
  partials: [
    // Enable partials for specific event types
    // Defind partials is mean that we want to get data from discord (any event you want bot receive)
    // you can read more about partials here: https://discordjs.guide/popular-topics/partials.html#partials
    Partials.Channel,
    Partials.GuildMember,
    Partials.Message,
    Partials.Reaction,
    Partials.User,
    Partials.ThreadMember,
    Partials.GuildScheduledEvent,
  ],
});

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, (c) => {
  console.log(`Bot Ready! Logged in as ${c.user.tag}`);
});

// Log in to Discord with your client's token
client.login(token);

// event user send message
client.on(Events.MessageCreate, (message) => {
  console.log(
    `received message: ${message.content} on channel ${message.channel.name}`
  );
  // check if bot's message
  if (message.author.bot) return;

  // user message
  if (message.content === "hello") {
    message.channel.send("Bot Hello!");
  }
});

// register slash command on Bot join server
// If bot join's server, you must be kick bot and invite again to see slash command while application while runing
client.on(Events.ClientReady, async (c) => {
  await c.application?.commands.create({
    name: "ping",
    description: "Replies with Pong!",
  });
});

// event handle slash command
client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === "ping") {
    await interaction.reply("Pong!");
  }
});