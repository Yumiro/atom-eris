class guildBanRemove {
    constructor(bot) {
        this.bot = bot
    }
    async run(guild, user) {
        const channel = this.bot.guilds.find(f => f.name === 'atom/dev').channels.find(f => f.id === '613783841869529094');
        channel.createMessage({
            embed: {
                color: this.bot.embedCOLOR,
                title: 'Member Unbanned',
                fields: [{
                    name: 'User',
                    value: user.username + '#' + user.discriminator + ` (${user.id})`
                }],
                footer: {
                    text: msg.channel.guild.name
                }
            }
        });
    }
}

module.exports = guildBanRemove;