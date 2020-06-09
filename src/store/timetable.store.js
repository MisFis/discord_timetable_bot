const fs = require('fs');
const path = require('path');
const fileMessagePath = path.join(__dirname, '..', 'data.json');
let messages = require(fileMessagePath);

module.exports = {
    getMessage: () => {
        return messages;
    },
    writeDateToFile: (message) => {
        return new Promise(resolve => {
            fs.writeFile(fileMessagePath, JSON.stringify(message, null, 2), (err) => {
                if (err) return console.log(err);
                // console.log('writing to ' + fileMessagePath, JSON.stringify(messages));
                messages = JSON.parse(fs.readFileSync(fileMessagePath));
                resolve(message);
            }); // Сохраняем изменения в файл и чистим очередь.
        })
    }
}
