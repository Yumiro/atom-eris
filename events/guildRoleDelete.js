const {
    utc
} = require('moment');
class guildRoleDelete {
    constructor(bot) {
        this.bot = bot
    }
    async run(guild, role) {
        const channel = this.bot.guilds.find(f => f.name === 'atom/dev').channels.find(f => f.id === '613783535630680076');
        channel.createMessage({
            embed: {
                color: 0x36393f,
                title: 'Role Deleted',
                fields: [{
                    name: 'Name',
                    value: role.name,
                    inline: true
                }, {
                    name: 'Color',
                    value: role.color.toString(16),
                    inline: true
                }, {
                    name: 'ID',
                    value: role.id
                }]
            }
        });
    }
}

module.exports = guildRoleDelete;