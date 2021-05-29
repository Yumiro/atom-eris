const Command = require('../../structures/Command');
class Unban extends Command {
    constructor(bot) {
        super(bot, {
            name: 'unban',
            description: 'Unbans a member from the current server',
            category: '🔨 Moderation',
            aliases: ['ub', 'unbean', 'unb'],
            usage: 'unban <user> [reason]'
        })
        this.run = async (msg, args) => {
            const user = msg.channel.guild.getBan(args[0]);
            const reason = `[${msg.author.username.replace(/[^\x00-\x7F]/g, "")}#${msg.author.discriminator}] - ${msg.content.split(' ').slice(2).join(' ') || `unban command issued (no reason given)`}`;

            if (!msg.member.permission.has('banMembers')) {
                msg.channel.createMessage(`${this.bot.emojiList.error} You don't have the \`Ban Members\` permission.`);
            } else {
                if (user) {
                    user.then(u => {
                        msg.channel.guild.unbanMember(u.user.id, reason);
                        msg.channel.createMessage(`${this.bot.emojiList.check} Successfully unbanned ${u.user.username.replace(/[^\x00-\x7F]/g, "")}#${u.user.discriminator}.`);
                    });
                } else {
                    msg.channel.createMessage(`${this.bot.emojiList.error} User not found.`); // fix this later
                };
            };
        }
    }
}

module.exports = Unban;