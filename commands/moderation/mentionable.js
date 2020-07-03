const Command = require('../../structures/Command');
class Mentionable extends Command {
    constructor(bot) {
        super(bot, {
            name: 'mentionable',
            description: 'Sets the specified role mentionable or not mentionable (if mentionable, will set not mentionable and vice-versa)',
            category: '🔨 Moderation',
            aliases: ['set-mentionable', 'setmentionable', 'set-mention', 'mention'],
            usage: 'mentionable [true|false] [role name]'
        });
        this.run = async (msg, args) => {
            if (!msg.member.permission.has('manageRoles')) {
                msg.channel.createMessage(`${bot.emojiList.error} You don't have the \`Manage Roles\` permission.`);
            } else {
                const role = msg.channel.guild.roles.find(f => f.name === args.slice(1).join(' '));

                if (role) {
                    if (role.mentionable === false) {
                        role.edit({
                            mentionable: true
                        });

                        msg.channel.createMessage(`${this.bot.emojiList.check} Successfully made **${role.name}** mentionable.`);
                    } else if (role.mentionable === true) {
                        role.edit({
                            mentionable: false
                        });

                        msg.channel.createMessage(`${this.bot.emojiList.check} Successfully made **${role.name}** not mentionable.`)
                    };
                } else {
                    msg.channel.createMessage(`${this.bot.emojiList.error} Role not found.`);
                };
            };
        };
    };
};

module.exports = Mentionable;