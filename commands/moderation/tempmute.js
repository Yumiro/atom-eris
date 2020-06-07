const ms = require('ms');
const Command = require('../../structures/Command');
class tempMute extends Command {
    constructor(bot) {
        super(bot, {
            name: 'tempmute',
            description: 'Temporarily mutes a member in the guild',
            category: '🔨 Moderation',
            aliases: ['tm', 'temp-mute', 'temporarymute', 'temporary-mute', 'temp-shut', 'tempshut'],
            usage: 'tempmute <user> <time> [reason]'
        })
        this.run = async (msg, args) => {
            const user = msg.mentions[0] || msg.channel.guild.members.find(f => f.id === args[0]);
            const time = ms(args[1]);
            const reason = `[${msg.author.username.replace(/[^\x00-\x7F]/g, "")}#${msg.author.discriminator}] - ${msg.content.split(' ').slice(3).join(' ') || `mute command issued (no reason given, muted for ${args[1]})`}, muted for ${args[1]}`;
            let role = msg.channel.guild.roles.find(f => f.name === 'Muted' || f.name === 'muted');

            if (!msg.member.permission.has('manageRoles')) {
                msg.channel.createMessage(`${this.bot.emojiList.error} You don't have the \`Manage Roles\` permission.`);
            } else {
                if (user) {
                    if (!msg.channel.guild.members.find(f => f.id === user.id).permission.has('manageRoles')) {
                        if (time !== undefined) {
                            if (role) {
                                msg.channel.guild.members.find(f => f.id === user.id).addRole(role.id, reason);
                                msg.channel.createMessage(`${this.bot.emojiList.mute} ${user.mention} has been muted for ${args[1]}.`).then(() => {
                                    setTimeout(function () {
                                        msg.channel.guild.members.find(f => f.id === user.id).removeRole(role.id, 'auto unmute');
                                    }, time);
                                });
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
                                    msg.channel.createMessage(`${this.bot.emojiList.mute} ${user.mention} has been muted for ${args[1]}.`).then(() => {
                                        setTimeout(function () {
                                            msg.channel.guild.members.find(f => f.id === user.id).removeRole(role.id, 'auto unmute');
                                        }, time);
                                    });
                                } catch (e) {
                                    console.log(e);
                                };
                            };
                        } else {
                            msg.channel.createMessage(`${this.bot.emojiList.error} Please specify a valid time. Example: \`10s\`, \`30m\`, \`24h\``)
                        };
                    } else {
                        msg.channel.createMessage(`${this.bot.emojiList.error} You don't have the \`Manage Roles\` permission.`);
                    };
                } else {
                    msg.channel.createMessage(`${this.bot.emojiList.error} User not found.`);
                };
            };
        };
    };
};

module.exports = tempMute;