const Command = require('../../structures/Command');
class Help extends Command {
    constructor(bot) {
        super(bot, {
            name: 'help',
            description: 'Sends a list of all commands',
            category: '❔ Information',
            aliases: ['h', '?', 'cmds', 'commands'],
            usage: 'help [command]'
        })
        this.run = async (msg, args) => {
            if (!args[0]) {
                const embed = {
                    "embed": {
                        "title": 'Help',
                        "color": bot.embedCOLOR,
                        "footer": {
                            "text": msg.channel.guild.name
                        },
                        "fields": []
                    }
                };

                var groups = [];

                this.bot.commands.forEach(f => {
                    if (!groups.includes(f.help.category)) {
                        if (!require('../../config').developers.includes(msg.author.id) && f.config.developer) return;
                        groups.push(f.help.category);
                    };
                });

                groups.forEach((category) => {
                    embed.embed.fields.push({
                        name: firstUpper(category),
                        value: `\`${[...this.bot.commands].filter(f => f[1].help.category === category).map(f => f[1].help.name).join(`\` \``)}\``
                    });
                });

                msg.channel.createMessage(embed);
            };

            if (args[0]) {
                let cmd = args[0];

                if (this.bot.commands.has(cmd)) {
                    cmd = this.bot.commands.get(cmd);
                    if (cmd.category === '🧪 Development' && cmd.config.developer === true && !require('../../config').developers.includes(msg.author.id)) {
                        msg.channel.createMessage(`${this.bot.emojiList.error} You can't do that, you're not a Developer.`);
                        return;
                    };

                    if (cmd.category === '🔨 Moderation' && !msg.member.permission.has('manageMessages')) {
                        msg.channel.createMessage(`${this.bot.emojiList.error} You can't do that, you're not a Moderator. (Missing \`MANAGE_MESSAGES\`)`);
                    };
                } else {
                    msg.channel.createMessage(`${this.bot.emojiList.error} Something went wrong. Please make sure to type the command's name correctly.`);
                };

                const embed = {
                    "embed": {
                        "color": bot.embedCOLOR,
                        "footer": {
                            "text": '<> = Required • [] = Optional'
                        },
                        "fields": [{
                                name: firstUpper(cmd.help.name),
                                value: cmd.help.description,
                                inline: false
                            },
                            {
                                name: `Aliases`,
                                value: cmd.config.aliases.sort().join(', '),
                                inline: true
                            },
                            {
                                name: `Usage`,
                                value: cmd.help.usage,
                                inline: true
                            },
                            {
                                name: `Group`,
                                value: cmd.help.category,
                                inline: true
                            },
                        ]
                    }
                };

                await msg.channel.createMessage(embed);
            };
        }
    }
}

module.exports = Help;