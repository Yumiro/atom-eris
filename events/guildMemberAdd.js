const {
    utc
} = require('moment');
class guildMemberAdd {
    constructor(bot) {
        this.bot = bot
    }
    async run(guild, member) {
        const channel = this.bot.guilds.find(f => f.name === 'atom/dev').channels.find(f => f.id === '613783535630680076');
        channel.createMessage({
            embed: {
                color: this.bot.embedCOLOR,
                title: 'Member Joined',
                thumbnail: {
                    url: member.avatarURL || member.defaultAvatarURL
                },
                fields: [{
                    name: 'Name',
                    value: member.username + '#' + member.discriminator,
                    inline: true
                }, {
                    name: 'Joined At',
                    value: utc(member.joinedAt).format('ddd, MMM Do YYYY'),
                    inline: true
                }, {
                    name: 'Created At',
                    value: utc(member.createdAt).format('ddd, MMM Do YYYY'),
                    inline: true
                }, {
                    name: 'Bot',
                    value: member.bot ? 'Yes' : 'No',
                    inline: true
                }, {
                    name: 'Mention',
                    value: member.mention,
                    inline: true
                }, {
                    name: 'ID',
                    value: member.id,
                    inline: true
                }]
            }
        });

        member.guild.getInvites().then(guildInvites => {
            const ei = this.bot.invites[member.guild.id];
            this.bot.invites[member.guild.id] = guildInvites;
            const invite = guildInvites.find(i => ei.find(c => c.code === i.code).uses < i.uses );
            const inviter = this.bot.users.get(invite.inviter.id);
            channel.createMessage(`${member.mention} joined using invite code ${invite.code} from ${inviter.mention}. Invite has been used ${invite.uses} times`)
        });
    }
}

module.exports = guildMemberAdd;
