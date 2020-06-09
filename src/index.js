require('dotenv').config();

const Discord = require('discord.js');
const config = require('../config');
const fs = require('fs');
const path = require('path');

const commandPath = path.join(__dirname, 'commands', 'channel');
const channelFilesCommand = fs.readdirSync(commandPath).filter(file => file.endsWith('.js'));

const messagePath = path.join(__dirname, 'commands', 'message');
const commandFiles = fs.readdirSync(messagePath).filter(file => file.endsWith('.js'));

const channelCommand = [];

const client = new Discord.Client();

client.commands = new Discord.Collection();

for (const file of channelFilesCommand) {
    const command = require(`./commands/channel/${file}`);
    channelCommand.push(command);
}

for (const file of commandFiles) {
    const command = require(`./commands/message/${file}`);
    client.commands.set(command.name, command);
}

client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);

    setInterval(() => {
        const currentDate = new Date();
        channelCommand.forEach(channelCommand => {
            channelCommand.execute(client, currentDate);
        })
    }, 5000)

});

client.on('message', message => {
    if (message.author.bot && message.content.startsWith(config.prefix)) return;

    const args = message.content.slice(config.prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (!client.commands.has(command)) return;

    try {
        client.commands.get(command).execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('Кажется что то у меня не получилось :skull: ');
    }
});

client.login(process.env.TOKEN);
