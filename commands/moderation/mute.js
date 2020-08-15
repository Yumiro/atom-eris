const Command = require('../../structures/Command');
class Mute extends Command {
    constructor(bot) {
        super(bot, {
            name: 'mute',
            description: 'Mutes a member in the guild',
            category: '🔨 Moderation',
            aliases: ['m', 'shut', 'silence'],
            usage: 'mute <user> [reason]'
        })
        this.run = async (msg, args) => {
            const user = msg.channel.guild.members.find(f => f.id === msg.mentions[0].id) || msg.channel.guild.members.find(f => f.id === args[0]);
            const reason = `[${msg.author.username.replace(/[^\x00-\x7F]/g, "")}#${msg.author.discriminator}] - ${msg.content.split(' ').slice(3).join(' ') || 'mute command issued (no reason given)'}`;
            let role = msg.channel.guild.roles.find(f => f.name === 'Muted' || f.name === 'muted');

            if (!msg.member.permission.has('manageRoles')) {
                msg.channel.createMessage(`${this.bot.emojiList.error} You don't have the \`Manage Roles\` permission.`);
            } else {
                if (user) {
                    if (!msg.channel.guild.members.find(f => f.id === user.id).permission.has('manageRoles')) {
                            if (role) {
                                if (!user.roles.find(f => f === role.id)) {
                                    msg.channel.guild.members.find(f => f.id === user.id).addRole(role.id, reason);
                                    msg.channel.createMessage(`${this.bot.emojiList.mute} ${user.mention} has been muted.`);
                                } else {
                                    msg.channel.createMessage(`${this.bot.emojiList.error} This user is already muted.`);
                                }
                            } else {
                                try {
                                    msg.channel.createMessage(`${this.bot.emojiList.error} \`Muted\` role not found. Creating one...`).then(m => m.delete(1500));
                                    role = await msg.channel.guild.createRole({
                                        name: 'Muted',
                                        color: 0x000000,
                                        permissions: 0,
                                        reason: reason
                                    });

                                    msg.channel.guild.channels.forEach(async (channel, id) => {
                                        await channel.editPermission(role.id, 0, 104127552, 'role', reason);
                                    });
                                    msg.channel.createMessage(`${this.bot.emojiList.check} Successfully created the \`Muted\` role.`).then(m => m.delete(2000));
                                    msg.channel.guild.members.find(f => f.id === user.id).addRole(role.id, reason);
                                    msg.channel.createMessage(`${this.bot.emojiList.mute} ${user.mention} has been muted.`);
                                } catch (e) {
                                    console.log(e);
                                }
                            }
                    } else {
                        msg.channel.createMessage(`${this.bot.emojiList.error} This user has the \`Manage Roles\` permission.`);
                    }
                } else {
                    msg.channel.createMessage(`${this.bot.emojiList.error} User not found.`);
                }
            };
        }
    }
}

module.exports = Mute;