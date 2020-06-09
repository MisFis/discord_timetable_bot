const { writeDateToFile } = require('../../store/timetable.store');

module.exports = {
    name: 'timetable:rm',
    description: 'remove timetable!',
    aliases: ['commands'],
    usage: 'help',
    execute(message, args) {
        if (args[0].includes('help')) {
            message.channel.send(`timetable:rm {id задач через пробел}`);
            return;
        }
        const messages = require('../../store/timetable.store').getMessage();
        const channelId = message.channel.id;

        if (!messages[channelId]) {
            message.channel.send(`Тут удалять нечего.`);
        }

        args.forEach(idMessage => {
            const findIndex = messages[channelId].findIndex(mess => mess.uuid === args[idMessage]);
            messages[channelId].splice(findIndex, 1);
        });

        writeDateToFile(messages).then(value => {
            console.log('remove message ', JSON.stringify(messages));
            message.channel.send(`${args.length === 1 ? 'Задача удалена' : 'Задачи удалены'} .`);
        });
    },
};
