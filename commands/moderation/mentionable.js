const Command = require('../../structures/Command');
class Mentionable extends Command {
    constructor(bot) {
        super(bot, {
            name: 'mentionable',
            description: 'Sets the specified role mentionable or unmentionable',
            category: '🔨 Moderation',
            aliases: ['set-mentionable', 'setmentionable'],
            usage: 'mentionable [true|false] [role name]'
        });
        this.run = async (msg, args) => {
            if (!msg.member.permission.has('manageRoles')) {
                msg.channel.createMessage(`${bot.emojiList.error} You don't have the \`Manage Roles\` permission.`);
            } else {
                const role = msg.guild.roles.find(f => f.name === args.slice(1).join(' '));

                if (msg.content.includes('true') && role) {
                    role.edit({
                        mentionable: true
                    });

                    msg.channel.createMessage(`${bot.emojiList.check} Successfully made **${role.name}** mentionable.`);
                } else {
                    msg.channel.createMessage(`${bot.emojiList.error} Role not found.`);
                };

                if (msg.content.includes('false') && role) {
                    role.edit({
                        mentionable: false
                    });

                    msg.channel.createMessage(`${bot.emojiList.check} Successfully made **${role.name}** unmentionable.`);
                } else {
                    msg.channel.createMessage(`${bot.emojiList.error} Role not found.`);
                };
            };
        };
    };
};

module.exports = Mentionable;