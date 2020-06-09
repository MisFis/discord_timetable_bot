module.exports = {
    name: 'ping',
    description: 'Ping!',
    aliases: ['commands'],
    usage: '[command name]',
    execute(message, args) {
        message.channel.send('Pong.');
    },
};
