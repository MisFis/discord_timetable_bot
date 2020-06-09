
module.exports = {
    name: 'timetable:get',
    description: 'get timetable list!',
    aliases: ['commands'],
    usage: 'help',
    execute(message, args) {
        if (args.length) {
            if (args[0].includes('help')) {
                message.channel.send(`Возвращает список всех задач которые есть у меня`);
                return;
            }
        }
        const messages = require('../../store/timetable.store').getMessage();
        const channelId = message.channel.id;
        if (!messages[channelId]) {
            message.channel.send(`Такс такс...Данный канал не записан в моей блокноте, если хотите добавить используйте команду !timetable:listen ${message.channel.id}`);
            return;
        }
        const result = messages[channelId].map(message => ({
            'ID': message.uuid,
            'Текст': message.content,
            'Дата начала': message.startDay,
            'Повторение': message.repeat,
            'Частота повторений': message.repeatTime,
            'Дата и время последнего отправления': message.lastSend,
        }));
        const resultJson = JSON.stringify(result,null, 2);
        if (resultJson.length <= 1980) {
            message.channel.send(`Список задач - ${JSON.stringify(result,null, 2)}`);
        } else {
            message.channel.send(`Список задач - `);
            const senderMessageSplice = [];
            const number = parseInt(resultJson.length / 2000);
            for(let i = 0;i <= number;i++) {
                const startSub = i * 2000;
                senderMessageSplice.push(resultJson.substring(startSub, startSub + 2000))
            }
            senderMessageSplice.forEach(value => {
                message.channel.send(value);
            })
        }


    },
};
