const config = require('./config.json');
const Client = require('./structures/Client');
const {
    Interaction
} = require('slash-commands-discord');
const bot = new Client(config.token);
bot.kill = () => process.exit(0)
const {
    readdir
} = require('fs');
const invites = {};

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

bot.on('rawWS', async (packet) => {
    if (packet.t === "INTERACTION_CREATE") {
        const data = packet.d;
        const interaction = new Interaction(data, config.token, bot.user.id);
        if (interaction.interaction.channel_id === '824716210758221835' && packet.d.data.custom_id === 'btn_1') {
            interaction.reply('** **').then(interaction.replyDelete());
            bot.guilds.find(f => f.id === '486518121604186112').channels.find(f => f.id === '824716210758221835').getMessage(packet.d.message.id).then(m => m.edit({
                content: "** **",
                components: [{
                    type: 1,
                    components: [{
                        type: 2,
                        style: 3,
                        custom_id: "btn_1",
                        label: " "
                    }, {
                        type: 2,
                        style: packet.d.message.components[0].components[1].style,
                        custom_id: "btn_2",
                        label: packet.d.message.components[0].components[1].label
                    }, {
                        type: 2,
                        style: packet.d.message.components[0].components[2].style,
                        custom_id: "btn_3",
                        label: packet.d.message.components[0].components[2].label
                    }]
                }]
            }))
        } else if (interaction.interaction.channel_id === '824716210758221835' && packet.d.data.custom_id === 'btn_2') {
            interaction.reply('** **').then(interaction.replyDelete());
            bot.guilds.find(f => f.id === '486518121604186112').channels.find(f => f.id === '824716210758221835').getMessage(packet.d.message.id).then(m => m.edit({
                content: "** **",
                components: [{
                    type: 1,
                    components: [{
                        type: 2,
                        style: packet.d.message.components[0].components[0].style,
                        custom_id: "btn_1",
                        label: packet.d.message.components[0].components[0].label
                    }, {
                        type: 2,
                        style: 3,
                        custom_id: "btn_2",
                        label: " "
                    }, {
                        type: 2,
                        style: packet.d.message.components[0].components[2].style,
                        custom_id: "btn_3",
                        label: packet.d.message.components[0].components[2].label
                    }]
                }]
            }))
        } else if (interaction.interaction.channel_id === '824716210758221835' && packet.d.data.custom_id === 'btn_3') {
            interaction.reply('** **').then(interaction.replyDelete());
            bot.guilds.find(f => f.id === '486518121604186112').channels.find(f => f.id === '824716210758221835').getMessage(packet.d.message.id).then(m => m.edit({
                content: "** **",
                components: [{
                    type: 1,
                    components: [{
                        type: 2,
                        style: packet.d.message.components[0].components[0].style,
                        custom_id: "btn_1",
                        label: packet.d.message.components[0].components[0].label
                    }, {
                        type: 2,
                        style: packet.d.message.components[0].components[1].style,
                        custom_id: "btn_2",
                        label: packet.d.message.components[0].components[1].label
                    }, {
                        type: 2,
                        style: 3,
                        custom_id: "btn_3",
                        label: " "
                    }]
                }]
            }))
            /*bot.guilds.find(f => f.id === '486518121604186112').channels.find(f => f.id === '824716210758221835').getMessage(packet.d.message.id).then(m => m.edit({
                content: "** **",
                components: [{
                    type: 1,
                    components: [{
                        type: 2,
                        style: 3,
                        custom_id: "btn_1",
                        label: "X"
                    }, {
                        type: 2,
                        style: packet.d.message.components[0].components[1].style,
                        custom_id: "btn_2",
                        label: packet.d.message.components[0].components[1].label
                    }, {
                        type: 2,
                        style: packet.d.message.components[0].components[2].style,
                        custom_id: "btn_3",
                        label: packet.d.message.components[0].components[2].label
                    }]
                }]
            }))*/
        }
    }
});

bot.config = config;
bot.version = 'v4-stable-dragonglass';
bot.invites = invites;
bot.embedCOLOR = 0x2f3136;
bot.emojiList = {
    'bell': '<a:abell:486584452600954890>',
    'check': '<:check:657238794499784735>',
    'error': '<:error:657238794461904916>',
    'mute': '<:muted:675777457059659802>',
    'unmute': '<:unmuted:675777457118248960>',
    'members': '<:members:675777456833298472>',
    'settings': '<:settings:675777457076436993>',
    'verify': '<:verified:675777457428889629>',
    'invite': '<:invite:675777456912859156>',
    'mention': '<:mention:675777456963059723>',
    'news': '<:news:675777457105797124>',
    'presence': '<:rich_presence:675777457139220500>',
    'time': '<:slowmode:675782310318178310>',
    'stream': '<:stream:675783964371320842>'
};

global.firstUpper = function firstUpper(string) {
    const first = string.split("")[0].toUpperCase();
    const rest = string.split("").slice(1).join("");
    return first + rest
};

global.numberThing = function numberThing(num) {
    const number = num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    return number
};

bot.connect();