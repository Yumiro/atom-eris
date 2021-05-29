const Command = require('../../structures/Command');
class Hoisted extends Command {
    constructor(bot) {
        super(bot, {
            name: 'hoisted',
            description: 'Sets the specified role hoisted or not hoisted, depending on its current state',
            category: '🔨 Moderation',
            aliases: ['hoist'],
            usage: 'hoisted <role name>'
        });
        this.run = async (msg, args) => {
            if (!msg.member.permission.has('manageRoles')) {
                msg.channel.createMessage(`${bot.emojiList.error} You don't have the \`Manage Roles\` permission.`);
            } else {
                const role = msg.channel.guild.roles.find(f => f.name === args.slice(0).join(' '));

                if (role) {
                    if (role.hoist === false) {
                        role.edit({
                            hoist: true
                        });

                        msg.channel.createMessage(`${this.bot.emojiList.check} Successfully made **${role.name}** hoisted.`);
                    } else if (role.hoist === true) {
                        role.edit({
                            hoist: false
                        });

                        msg.channel.createMessage(`${this.bot.emojiList.check} Successfully made **${role.name}** not hoisted.`);
                    };
                } else {
                    msg.channel.createMessage(`${this.bot.emojiList.error} Role not found.`);
                };
            };
        }
    }
}

module.exports = Hoisted;