const ms = require('ms');
const Command = require('../../structures/Command');
class Mute extends Command {
    constructor(bot) {
        super(bot, {
            name: 'mute',
            description: 'Mutes a member in the guild',
            category: '🔨 Moderation',
            aliases: ['m', 'shut'],
            usage: 'mute <user> [reason]'
        })
        this.run = async (msg, args) => {
            const user = msg.mentions[0];
            const reason = `[${msg.author.username}#${msg.author.discriminator}] - ${msg.content.split(' ').slice(2).join(' ') || 'mute command issued'}`;
            let role = msg.channel.guild.roles.find(f => f.name === 'Muted' || f.name === 'muted');

            if (user) {
                if (role) {
                    if (msg.member.permission.has('manageRoles')) {
                        if (!msg.channel.guild.members.find(f => f.id === user.id).permission.has('manageRoles')) {
                            msg.channel.guild.members.find(f => f.id === user.id).addRole(role.id, reason);
                            msg.channel.createMessage(`${this.bot.emojiList.check} Successfully muted ${user.mention}.`);
                        } else {
                            msg.channel.createMessage(`${this.bot.emojiList.error} This user has the \`Manage Roles\` permission.`);
                        }
                    } else {
                        msg.channel.createMessage(`${this.bot.emojiList.error} You don't have the \`Manage Roles\` permission.`);
                    };
                } else {
                    try {
                        role = await msg.channel.guild.createRole({
                            name: 'Muted',
                            color: 0x000000,
                            permissions: 0,
                            reason: reason
                        });

                        msg.channel.guild.channels.forEach(async (channel, id) => {
                            await channel.editPermission(role.id, 0, 104127552, 'role', reason);
                        });
                    } catch (e) {
                        console.log(e);
                    };
                };
            } else {
                msg.channel.createMessage(`${this.bot.emojiList.error} User not found.`);
            };
        }
    }
}

module.exports = Mute;