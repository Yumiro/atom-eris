const config = require('./config');
const Client = require("./structures/Client");
const bot = new Client(config.token);
const {
    readdir
} = require('fs');

readdir('./events', (err, files) => {
    files.forEach((f) => {
        if (!f.split('.')[1] === 'js') return;
        const event = new(require(`./events/${f}`))(bot);
        bot.on(f.split('.')[0], (...args) => {
            event.run(...args);
        });
        console.log(`Loading ${f} (event)`);
    });
});

readdir('./commands', (err, folders) => {
    folders.forEach((f) => {
        readdir(`./commands/${f}`, (err, files) => {
            files.forEach((file) => {
                if (!file.split('.')[1] === 'js') return;
                const command = new(require(`./commands/${f}/${file}`))(bot);
                bot.commands.set(command.help.name, command);
                if (command.config.aliases.length >= 1) {
                    command.config.aliases.forEach((alias) => {
                        bot.aliases.set(alias, command.help.name);
                    });
                };
                console.log(`Loading ${file} (command)`);
            });
        });
    });
});

bot.config = config;
bot.version = 'v4-dev-dragonglass';
bot.versionIMG = 'https://vignette.wikia.nocookie.net/azure-mines/images/4/43/Abyssium.png';
bot.emojiList = {
    'bell': '<a:abell:486584452600954890>',
    'check': '<:check:657238794499784735>',
    'error': '<:error:657238794461904916>'
};

global.firstUpper = function firstUpper(string) {
    const first = string.split("")[0].toUpperCase();
    const rest = string.split("").slice(1).join("");
    return first + rest
};

bot.connect();