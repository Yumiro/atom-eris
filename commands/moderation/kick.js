const Command = require('../../structures/Command');
class Kick extends Command {
    constructor(bot) {
        super(bot, {
            name: 'kick',
            description: 'Kicks a member in the current server',
            category: '🔨 Moderation',
            aliases: ['k'],
            usage: 'kick <user> [reason]'
        })
        this.run = async (msg, args) => {
            const user = msg.mentions[0] || msg.channel.guild.members.find(f => f.id === args[0]);
            const reason = `[${msg.author.username.replace(/[^\x00-\x7F]/g, "")}#${msg.author.discriminator}] - ${msg.content.split(' ').slice(2).join(' ') || `kick command issued (no reason given)`}`;

            if (!msg.member.permission.has('kickMembers')) {
                msg.channel.createMessage(`${this.bot.emojiList.error} You don't have the \`Kick Members\` permission.`);
            } else {
                if (user) {
                    if (!msg.channel.guild.members.find(f => f.id === user.id).permission.has('kickMembers')) {
                        msg.channel.guild.kickMember(user.id, reason);
                        msg.channel.createMessage(`${this.bot.emojiList.check} ${user.mention} has been kicked.`);
                    } else {
                        msg.channel.createMessage(`${this.bot.emojiList.error} This user has the \`Kick Members\` permission.`);
                    }
                } else {
                    msg.channel.createMessage(`${this.bot.emojiList.error} User not found.`);
                };
            };
        }
    }
}

    module.exports = Kick;
