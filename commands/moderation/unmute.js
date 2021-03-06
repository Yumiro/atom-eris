const ms = require('ms');
const Command = require('../../structures/Command');
class Unmute extends Command {
    constructor(bot) {
        super(bot, {
            name: 'unmute',
            description: 'Unmutes a member in the current server',
            category: '🔨 Moderation',
            aliases: ['um', 'unshut', 'unsilence'],
            usage: 'unmute <user> [reason]'
        })
        this.run = async (msg, args) => {
            const user = msg.channel.guild.members.find(f => f.id === msg.mentions[0].id) || msg.channel.guild.members.find(f => f.id === args[0]);
            const reason = `[${msg.author.username.replace(/[^\x00-\x7F]/g, "")}#${msg.author.discriminator}] - ${msg.content.split(' ').slice(2).join(' ') || `unmute command issued (no reason given)`}`;
            let role = msg.channel.guild.roles.find(f => f.name === 'Muted' || f.name === 'muted');

            if (!msg.member.permission.has('manageRoles')) {
                msg.channel.createMessage(`${this.bot.emojiList.error} You don't have the \`Manage Roles\` permission.`);
            } else {
                if (user) {
                    if (role) {
                        if (user.roles.find(f => f === role.id)) {
                            msg.channel.guild.members.find(f => f.id === user.id).removeRole(role.id, reason);
                            msg.channel.createMessage(`${this.bot.emojiList.unmute} ${user.mention} has been unmuted.`);
                        } else {
                            msg.channel.createMessage(`${this.bot.emojiList.error} This user is already unmuted.`);
                        }
                    } else {
                        msg.channel.createMessage(`${this.bot.emojiList.error} Role not found.`);
                    }
                } else {
                    msg.channel.createMessage(`${this.bot.emojiList.error} User not found.`);
                }
            };
        }
    }
}

module.exports = Unmute;