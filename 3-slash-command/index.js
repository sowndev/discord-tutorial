"use strict"
const { Client, Events, IntentsBitField, Partials } = require("discord.js"); // import discord module
require("dotenv").config(); // import dotenv module
const token = process.env.TOKEN; // get token from environment variable
const commonEvent = require("./src/common-event")
const slashCommand = require("./src/slash-command/index.v3")
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

// handler slash command
slashCommand(client)