const config = require('../../../config');


module.exports = {
    name: 'help',
    description: 'Command list',
    aliases: ['commands'],
    execute(message, args) {
        const { commands } = message.client;
        const data = [];
        if (!args.length) {
            data.push('Here\'s a list of all my commands:');
            data.push(commands.map(command => `command key ${command.name} - ${command.description}`).join('\n'));
            data.push(`\nYou can send \`${config.prefix}help [command name]\` to get info on a specific command!`);
            return message.author.send(data, { split: true })
                .then(() => {
                    if (message.channel.type === 'dm') return;
                    message.reply('I send all command in PM');
                })
                .catch(error => {
                    console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
                    message.reply('it seems like I can\'t DM you! Do you have DMs disabled?');
                });
        }

        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        if (!command) {
            return message.reply('that\'s not a valid command!');
        }

        data.push(`**Name:** ${command.name}`);

        if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
        if (command.description) data.push(`**Description:** ${command.description}`);
        if (command.usage) data.push(`**Usage:** ${config.prefix}${command.name} ${command.usage}`);

        // data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);

        message.channel.send(data, { split: true });
    },
};
