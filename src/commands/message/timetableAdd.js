
const config = require('../../../config');
const { writeDateToFile, getMessage } = require('../../store/timetable.store');
const { v4 } = require('uuid');

module.exports = {
    name: 'timetable:add',
    description: 'add timetable!',
    aliases: ['commands'],
    usage: 'help',
    execute(message, args) {

        if (args.length && args[0].includes('help')) {
            message.channel.send(`Порядок полей: Текст | Дата начала(dd.mm.yyyy hh:mm) | Повторение(true/false) | Частота повторений(hh:mm или вс,пн,вт,ср,чт,пт,сб) Разделить между полями "|"`);
            return;
        }
        const messages = getMessage();
        const channelId = message.channel.id;
        if (!messages[channelId]) {
            message.channel.send(`Я не слежу за расписанием комнаты ${message.channel.name}, если хотите чтоб я записывал расписание данной комнаты используйте команду !timetable:listen ${message.channel.id}`);
            return;
        }
        let [content, startDay, repeat, repeatTime] = message.content.slice(config.prefix.length + 'timetable:add'.length).split('|');
        content = content.trim();
        startDay = startDay.trim();
        repeatTime = repeatTime.trim();
        repeat = repeat.trim() === 'true';
        messages[channelId].push({ uuid: v4(), content, startDay,repeat,repeatTime });
        writeDateToFile(messages).then(() => {
            message.channel.send(`Добавленно новое расписание для ${message.channel.name}\n Текст: ${content}\n Дата начала: ${startDay}, Повторение: ${repeat ? 'Да' : 'Нет'}, Частота повторений: ${repeatTime}`);
        })
    },
};
