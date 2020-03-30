class guildBanRemove {
    constructor(bot) {
        this.bot = bot
    }
    async run(user) {
        const channel = this.bot.guilds.find(f => f.name === 'atom/dev').channels.find(f => f.id === '613783535630680076');
        channel.createMessage({
            embed: {
                color: bot.embedCOLOR,
                title: 'Ban Removed',
                fields: [{
                    name: 'User',
                    value: user.username + '#' + user.discriminator + ` (${user.id})`
                }]
            }
        });
    }
}

module.exports = guildBanRemove;