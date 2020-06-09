const Discord = require("discord.js");

module.exports = {
    name: 'message:collect',
    description: 'start collect all message in this channel',
    aliases: ['commands'],
    usage: '[command name]',
    execute(message, args) {
        let filter = (m) => !m.author.bot;
        const collector = new Discord.MessageCollector(message.channel, filter, { max: 100 });
        collector.on('collect', (mes) => {
            console.log('message collect ', mes.content);
        });

        collector.on('end', (collected, reason) => {
            console.log('message collect size', collected.size);
            console.log('collection message reason ', reason);
            let authorUnique = {};
            collected.forEach(value => {
                if (!authorUnique[value.author.username])
                    authorUnique[value.author.username] = value.author
            });
            message.channel.send(`finish collect, size ${collected.size}. unique author ${Object.keys(authorUnique).length}`);
        })
    },
};
