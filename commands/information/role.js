const {
    utc
} = require('moment');
const Command = require('../../structures/Command');
class Role extends Command {
    constructor(bot) {
        super(bot, {
            name: 'role',
            description: 'Displays information about a specific role in the guild',
            category: '❔ Information',
            aliases: ['roleinfo'],
            usage: 'role <name>'
        })
        this.run = async (msg, args) => {
            const role = msg.channel.guild.roles.find(f => f.name === msg.content.split(' ').splice(1).join(' '));

            if (role) {
                msg.channel.createMessage({
                    embed: {
                        color: role.color,
                        footer: {
                            text: msg.channel.guild.name
                        },
                        fields: [{
                                name: 'Name',
                                value: role.name,
                                inline: true
                            }, {
                                name: 'Color',
                                value: role.color.toString(16),
                                inline: true
                            }, {
                                name: 'Created At',
                                value: utc(role.createdAt).format('ddd, MMM Do YYYY'),
                                inline: true
                            }, {
                                name: 'Mentionable',
                                value: role.mention ? 'Yes' : 'No',
                                inline: true
                            }, {
                                name: 'Hoisted',
                                value: role.hoist ? 'Yes' : 'No',
                                inline: true
                            }, {
                                name: 'Managed',
                                value: role.managed ? 'Yes' : 'No',
                                inline: true
                            }, {
                                name: 'Position',
                                value: role.position,
                                inline: true
                            }, {
                                name: 'Mention',
                                value: role.mention,
                                inline: true
                            }, {
                                name: 'ID',
                                value: role.id,
                                inline: true
                            }
                        ]
                    }
                });
            } else {
                msg.channel.createMessage(`${this.bot.emojiList.error} Role not found.`);
            };
        }
    }
}

module.exports = Role;