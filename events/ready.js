class Ready {
    constructor(bot) {
        this.bot = bot
    }
    async run() {
        this.bot.editStatus('online', { name: `over ${this.bot.guilds.size} guilds • ${this.bot.config.prefix}help `, type: 3 });
        console.log('Successfully connected to Discord.');
        wait(1000);
        const invites = {};
        bot.guilds.forEach(g => {
            g.getInvites().then(guildInvites => {
                invites[g.id] = guildInvites
            });
        });
    }
}

module.exports = Ready;