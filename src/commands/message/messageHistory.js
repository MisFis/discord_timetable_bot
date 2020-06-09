const Discord = require("discord.js");

module.exports = {
    name: 'message:history',
    description: 'send history channel in PM',
    aliases: ['commands'],
    usage: '[command name]',
    async execute(message, args) {
        const getMessages = await message.channel.messages.fetch({ limit: 20 });
        const result = getMessages.map(value => ({author: value.author.username, content: value.content}));
        await message.author.send(JSON.stringify(result, null, 2), { split: true });
        await message.channel.send('I send history to PM');
    },
};
