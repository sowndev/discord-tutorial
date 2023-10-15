const { Client, Events, IntentsBitField, Partials } = require("discord.js"); // import discord module
require("dotenv").config(); // import dotenv module
const token = process.env.TOKEN; // get token from environment variable
const commonEvent = require("./src/common-event")
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
client.once(Events.ClientReady, interaction => {
  console.log(`Bot Ready! Logged in as ${interaction.user.tag}`);
});

// Log in to Discord with your client's token
client.login(token);


// handler common event 
commonEvent(client)

// register slash command on Bot join server
// If bot join's server, you must be kick bot and invite again to see slash command while application while runing
client.on(Events.ClientReady, async interaction => {
  await interaction.application?.commands.create({
    name: "ping",
    description: "Replies with Pong!",
  });
});
// event handle slash command
client.on(Events.interactionCreate, async (interaction) => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === "ping") {
    awaitinteraction.reply("Pong!");
  }
});
