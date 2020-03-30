class guildBanAdd {
    constructor(bot) {
        this.bot = bot
    }
    async run(user) {
        // Just incase someone has another server named 'atom/dev'
        const channel = this.bot.guilds.find(f => f.name === 'atom/dev' && f.channels.has('613783535630680076')).channels.find(f => f.id === '613783535630680076');
        channel.createMessage({
            embed: {
                color: this.bot.embedCOLOR,
                title: 'Ban Added',
                fields: [{
                    name: 'User',
                    value: user.username + '#' + user.discriminator + ` (${user.id})`
                }]
            }
        });
    }
}

module.exports = guildBanAdd;
