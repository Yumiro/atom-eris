class guildBanAdd {
    constructor(bot) {
        this.bot = bot
    }
    async run(user) {
        const channel = this.bot.guilds.find(f => f.name === 'atom/dev').channels.find(f => f.id === '613783535630680076');
        channel.createMessage({
            embed: {
                color: 0x36393f,
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