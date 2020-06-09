const Command = require('../../structures/Command');
const ms = require('ms');
class TempBan extends Command {
    constructor(bot) {
        super(bot, {
            name: 'tempban',
            description: 'Temporarily bans a member in the guild',
            category: '🔨 Moderation',
            aliases: ['tb', 'tempbean', 'tempb', 'temp-ban'],
            usage: 'tempban <user> <time> [reason]'
        })
        this.run = async (msg, args) => {
            const user = msg.mentions[0] || msg.channel.guild.members.find(f => f.id === args[0]);
            const time = ms(args[1]);
            const reason = `[${msg.author.username.replace(/[^\x00-\x7F]/g, "")}#${msg.author.discriminator}] - ${msg.content.split(' ').slice(2).join(' ') || 'tempban command issued (no reason given)'}`;

            if (!msg.member.permission.has('banMembers')) {
                msg.channel.createMessage(`${this.bot.emojiList.error} You don't have the \`Ban Members\` permission.`);
            } else {
                if (user) {
                    if (!msg.channel.guild.members.find(f => f.id === user.id).permission.has('banMembers')) {
                        if (time !== undefined) {
                            msg.channel.guild.banMember(user.id, 7, reason);
                            msg.channel.createMessage(`${this.bot.emojiList.check} ${user.mention} has been banned for ${args[1]}.`).then(() => {
                                setTimeout(function() {
                                    msg.channel.guild.getBan(args[0].id).then(u => {
                                        msg.channel.guild.unbanMember(u.user.id, 'auto unban')
                                    });
                                }, time);
                            });
                        } else {
                            msg.channel.createMessage(`${this.bot.emojiList.error} Please specify a valid time. Example: \`10s\`, \`30m\`, \`24h\``)
                        }
                    } else {
                        msg.channel.createMessage(`${this.bot.emojiList.error} This user has the \`Ban Members\` permission.`);
                    }
                } else {
                    msg.channel.createMessage(`${this.bot.emojiList.error} User not found.`);
                }
            };
        };
    };
};

module.exports = TempBan;