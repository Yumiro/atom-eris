const {
    utc
} = require('moment');
class guildMemberRemove {
    constructor(bot) {
        this.bot = bot
    }
    async run(guild, member) {
        const channel = this.bot.guilds.find(f => f.name === 'atom/dev').channels.find(f => f.id === '613783841869529094');
        channel.createMessage({
            embed: {
                color: this.bot.embedCOLOR,
                title: 'Member Left',
                thumbnail: {
                    url: member.avatarURL || member.defaultAvatarURL
                },
                fields: [{
                    name: 'Name',
                    value: member.username + '#' + member.discriminator,
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
                }],
                footer: {
                    text: guild.name
                }
            }
        });
    }
}

module.exports = guildMemberRemove;