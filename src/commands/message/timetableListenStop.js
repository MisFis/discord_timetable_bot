const fs = require('fs');
const path = require('path');
const config = require('../../../config');
const fileMessagePath = path.join(__dirname, '..', '..', 'data.json');

const { v4 } = require('uuid');

module.exports = {
    name: 'timetable:listen:stop',
    description: 'stop listen timetable!',
    aliases: ['commands'],
    usage: 'help',
    execute(message, args) {
        if (args[0].includes('help')) {
            message.channel.send(`timetable:listen:stop Id комнат через запятую.`);
            return;
        }
        const messages = require(fileMessagePath);

        args.forEach(id => {
            delete messages[id]
        });
        fs.writeFile(fileMessagePath, JSON.stringify(messages, null, 2), function writeJSON(err) {
            if (err) return console.log(err);
            message.channel.send(`Уже все забыл, если что обращайтесь! Рад помочь! `);
        });
    },
};
