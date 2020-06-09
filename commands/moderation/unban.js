const Command = require('../../structures/Command');
class Unban extends Command {
    constructor(bot) {
        super(bot, {
            name: 'unban',
            description: 'Unbans a member from the guild',
            category: '🔨 Moderation',
            aliases: ['ub', 'unbean', 'unb'],
            usage: 'unban <user> [reason]'
        })
        this.run = async (msg, args) => {
            const user = msg.mentions[0] || msg.channel.guild.members.find(f => f.id === args[0]) || args[0];
            const reason = `[${msg.author.username.replace(/[^\x00-\x7F]/g, "")}#${msg.author.discriminator}] - ${msg.content.split(' ').slice(2).join(' ') || 'ban command issued (no reason given)'}`;

            if (!msg.member.permission.has('banMembers')) {
                msg.channel.createMessage(`${this.bot.emojiList.error} You don't have the \`Ban Members\` permission.`);
            } else {
                if (user) {
                    if (!msg.channel.guild.members.find(f => f.id === user.id).permission.has('banMembers')) {
                        msg.channel.guild.unbanMember(user.id, reason);
                        msg.channel.createMessage(`${this.bot.emojiList.check} Successfully unbanned ${user.mention}.`);
                    } else {
                        msg.channel.createMessage(`${this.bot.emojiList.error} This user has the \`Ban Members\` permission.`);
                    }
                } else {
                    msg.channel.createMessage(`${this.bot.emojiList.error} User not found.`);
                };
            };
        };
    };
};

module.exports = Unban;