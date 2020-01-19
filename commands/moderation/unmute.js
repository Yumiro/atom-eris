const ms = require('ms');
const Command = require('../../structures/Command');
class Unmute extends Command {
    constructor(bot) {
        super(bot, {
            name: 'unmute',
            description: 'Unmutes a member in the guild',
            category: '🔨 Moderation',
            aliases: ['um', 'unsilence'],
            usage: 'unmute <user> [reason]'
        })
        this.run = async (msg, args) => {
            const user = msg.mentions[0];
            const reason = `[${msg.author.username}#${msg.author.discriminator}] - ${msg.content.split(' ').slice(2).join(' ') || 'unmute command issued'}`;
            let role = msg.channel.guild.roles.find(f => f.name === 'Muted' || f.name === 'muted');

            if (user) {
                if (role) {
                    if (msg.member.permission.has('manageRoles')) {
                        if (!msg.guild.users.find(f => f.id === user.id).roles.find(f => f.id === role.id)) {
                            msg.channel.guild.members.find(f => f.id === user.id).removeRole(role.id, reason);
                            msg.channel.createMessage(`${this.bot.emojiList.check} Successfully unmuted ${user.mention}.`);
                        } else {
                            msg.channel.createMessage(`${this.bot.emojiList.error} This user isn't muted.`);
                        };
                    } else {
                        msg.channel.createMessage(`${this.bot.emojiList.error} You don't have the \`Manage Roles\` permission.`);
                    };
                } else {
                    msg.channel.createMessage(`${this.bot.emojiList.error} Role not found.`);
                };
            } else {
                msg.channel.createMessage(`${this.bot.emojiList.error} User not found.`);
            };
        }
    }
}

module.exports = Unmute;