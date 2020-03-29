const {
    utc
} = require('moment');
const Command = require('../../structures/Command');
class Guild extends Command {
    constructor(bot) {
        super(bot, {
            name: 'guild',
            description: 'Displays information about the current guild',
            category: '❔ Information',
            aliases: ['gi', 'server', 'si', 'guildinfo', 'serverinfo'],
            usage: 'guild'
        })
        this.run = async (msg) => {
            let level;
            let content;

            if (msg.channel.guild.verificationLevel === 0) {
                level = `Unrestricted`;
            } else if (msg.channel.guild.verificationLevel === 1) {
                level = `Email Verification`;
            } else if (msg.channel.guild.verificationLevel === 2) {
                level = `Registered for 5 min`;
            } else if (msg.channel.guild.verificationLevel === 3) {
                level = `Server Member for 10 min`;
            } else if (msg.channel.guild.verificationLevel === 4) {
                level = `Phone Verification`;
            };

            if (msg.channel.guild.explicitContentFilter === 0) {
                content = `Grandma's Tea Party`
            } else if (msg.channel.guild.explicitContentFilter === 1) {
                content = `Trusted Membership`;
            } else if (msg.channel.guild.explicitContentFilter === 2) {
                content = `Squeaky Clean Shine`;
            };

            msg.channel.createMessage({
                embed: {
                    color: bot.embedCOLOR,
                    author: {
                        name: msg.channel.guild.name
                    },
                    fields: [{
                            name: 'User Count',
                            value: msg.channel.guild.memberCount + ' users',
                            inline: true
                        },
                        {
                            name: 'Channel Count',
                            value: msg.channel.guild.channels.size + ' channels',
                            inline: true
                        },
                        {
                            name: 'Role Count',
                            value: msg.channel.guild.roles.size + ' roles',
                            inline: true
                        },
                        {
                            name: 'Created At',
                            value: utc(msg.channel.guild.createdAt).format('ddd, MMM Do YYYY'),
                            inline: true
                        },
                        {
                            name: 'Verification Level',
                            value: level,
                            inline: true
                        },
                        {
                            name: 'Content Filter',
                            value: content,
                            inline: true
                        },
                        {
                            name: 'Large',
                            value: msg.channel.guild.large ? 'Very' : 'Not really',
                            inline: true
                        },
                        {
                            name: 'Two-Factor Level',
                            value: msg.channel.guild.mfaLevel ? 'Required' : 'Not required',
                            inline: true
                        },
                        {
                            name: 'Owner',
                            value: '<@' + msg.channel.guild.ownerID + '>',
                            inline: true
                        }
                    ]
                }
            });
        };
    };
};

module.exports = Guild;