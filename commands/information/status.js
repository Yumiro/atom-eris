const { duration } = require('moment');
require('moment-duration-format');
const Command = require('../../structures/Command');
class Status extends Command {
    constructor(bot) {
        super(bot, {
            name: 'status',
            description: 'Views the current status of the bot',
            category: '❔ Information',
            aliases: ['stats', 'performance'],
            usage: 'status'
        })
        this.run = async (msg) => {
            msg.channel.createMessage({
                embed: {
                    color: 0x36393f,
                    title: 'Bot Status',
                    footer: {
                        text: msg.channel.guild.name,
                        icon_url: this.bot.versionIMG
                    },
                    fields: [
                        {
                            name: 'Memory Usage',
                            value: (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + 'MB',
                            inline: true
                        },
                        {
                            name: 'Uptime',
                            value: duration(bot.uptime).format('D[d] H[h] m[m] s[s]'),
                            inline: true
                        },
                        {
                            name: 'Commands',
                            value: this.bot.commands.size,
                            inline: true
                        },
                        {
                            name: 'Servers',
                            value: this.bot.guilds.size,
                            inline: true
                        },
                        {
                            name: 'Users',
                            value: this.bot.users.size,
                            inline: true
                        },
                        {
                            name: 'Version',
                            value: this.bot.version,
                            inline: true
                        }
                    ]
                }
            });
        };
    };
};

module.exports = Status;