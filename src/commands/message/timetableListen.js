const { writeDateToFile } = require('../../store/timetable.store');

module.exports = {
    name: 'timetable:listen',
    description: 'listen timetable is first command to use Me!',
    aliases: ['commands'],
    usage: 'help',
    execute(message, args) {
        const messages = require('../../store/timetable.store').getMessage();
        if (args.length && args[0].includes('help')) {
            message.channel.send(`timetable:listen Id комнат через ','. Если не указан id, берется id текущей комнаты`);
            return;
        } else if (args.length) {
            args.forEach(id => {
                messages[id] = []
            });
        } else {
            messages[message.channel.id] = [];
        }
        writeDateToFile(messages).then(value => {
            message.channel.send(`Теперь Вы можете добавить ваши планы в мой блокнот и я точно не забуду напомнить Вам о них :wink: `);
        });
    },
};
