const Command = require('../../structures/Command');
class Hoisted extends Command {
    constructor(bot) {
        super(bot, {
            name: 'hoisted',
            description: 'Sets the specified role hoisted or not hoisted',
            category: '🔨 Moderation',
            aliases: ['set-hoisted', 'sethoisted'],
            usage: 'hoisted [true|false] [role name]'
        });
        this.run = async (msg, args) => {
            if (!msg.member.permission.has('manageRoles')) {
                msg.channel.createMessage(`${bot.emojiList.error} You don't have the \`Manage Roles\` permission.`);
            } else {
                const role = msg.channel.guild.roles.find(f => f.name === args.slice(1).join(' '));

                if (msg.content.includes('true') && role) {
                    role.edit({
                        hoist: true
                    });

                    msg.channel.createMessage(`${bot.emojiList.check} Successfully made **${role.name}** hoisted.`);
                };

                if (msg.content.includes('false') && role) {
                    role.edit({
                        hoist: false
                    });

                    msg.channel.createMessage(`${bot.emojiList.check} Successfully made **${role.name}** not hoisted.`);
                };
            };
        };
    };
};

module.exports = Hoisted;