const { Message } = require("discord.js");

/**
 * @param { Message<boolean>} message - The Discord client instance.
 */
module.exports = (message) => {
    // check if bot's message
    if (message.author.bot) return;

    // user message
    if (message.content === "hello") {
        message.channel.send("Bot Hello!");
    }
}