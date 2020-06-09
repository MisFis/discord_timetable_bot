const Discord = require('discord.js');
const {dateParser, period, toDateTimeFormat} = require("../../utils/date");
const { writeDateToFile } = require('../../store/timetable.store');

const messageQueue = [];
const dayOfWeek = {
    'вс': 0,
    'пн': 1,
    'вт': 2,
    'ср': 3,
    'чт': 4,
    'пт': 5,
    'сб': 6,
};

const sendAndUpdateMessage = (message, mainChannel, client) => {
    let discordMessage = new Discord.Message(client, {}, mainChannel);
    discordMessage.channel.send(message.content);
};

module.exports = {
    name: 'timetable',
    description: 'send message timetable',
    execute(client, currentDate, ...args) {
        const messages = require('../../store/timetable.store').getMessage();

        Object.entries(messages).forEach(([channelId, messageArray]) => {
            messageArray.forEach(async (message) => {
                const mainChannel = await client.channels.fetch(channelId);
                const startDay = dateParser(message.startDay);
                const lastSendMessage = message.lastSend ? dateParser(message.lastSend) : new Date(0);
                let periodDate = null;
                let days = null;
                if (message.repeatTime.includes(':')) {
                    periodDate = period(message.repeatTime);
                } else {
                    days = message.repeatTime.split(',')
                        .map(value => value.trim().toLowerCase())
                        .map(value => dayOfWeek[value])
                }
                let messSend = null;
                if (message.repeat && startDay <= currentDate && days &&
                    days.includes(currentDate.getDay()) && lastSendMessage.getDate() !== currentDate.getDate()) {
                    message.lastSend = toDateTimeFormat(currentDate);
                    messSend = {message, client, channel: mainChannel};
                    //sendAndUpdateMessage(message, mainChannel, client);
                } else if (periodDate && message.repeat && startDay <= currentDate && currentDate.getTime() >= lastSendMessage.getTime() + periodDate.getTime()) {
                    message.lastSend = toDateTimeFormat(currentDate);
                    messSend = {message, client, channel: mainChannel};
                    //sendAndUpdateMessage(message, mainChannel, client);
                } else if (!message.repeat && !message.isSend) {
                    message.isSend = true;
                    messSend = {message, client, channel: mainChannel};
                    //sendAndUpdateMessage(message, mainChannel, client);
                }
                if (messSend) {
                    messageQueue.push(messSend);
                }
            });
        }); // Формируем все сообщения для отправки
        messageQueue.forEach(message => {
            sendAndUpdateMessage(message.message, message.channel, message.client)  // Отправляем сообщения
        });

        if (messageQueue.length) {
            writeDateToFile(messages)
                .then(() => {
                    messageQueue.splice(0, messageQueue.length);
                })
        }
    },
};
