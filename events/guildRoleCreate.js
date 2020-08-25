const {
    utc
} = require('moment');
class guildRoleCreate {
    constructor(bot) {
        this.bot = bot
    }
    async run(guild, role) {
        const channel = this.bot.guilds.find(f => f.name === 'atom/dev').channels.find(f => f.id === '613783841869529094');
        channel.createMessage({
            embed: {
                color: this.bot.embedCOLOR,
                title: 'Role Created',
                fields: [{
                    name: 'Name',
                    value: role.name,
                    inline: true
                }, {
                    name: 'Created At',
                    value: utc(role.createdAt).format('ddd, MMM Do YYYY'),
                    inline: true
                }, {
                    name: 'Mentionable',
                    value: role.mentionable ? 'Yes' : 'No',
                    inline: true
                }, {
                    name: 'Hoisted',
                    value: role.hoist ? 'Yes' : 'No',
                    inline: true
                }, {
                    name: 'Color',
                    value: '#' + role.color.toString(16),
                    inline: true
                }, {
                    name: 'ID',
                    value: role.id,
                    inline: true
                }],
                footer: {
                    text: msg.channel.guild.name
                }
            }
        });
    }
}

module.exports = guildRoleCreate;