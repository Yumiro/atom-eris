class Ready {
    constructor(bot) {
        this.bot = bot
    }
    async run() {
        this.bot.editStatus('online', { name: `over ${this.bot.guilds.size} guilds • ${this.bot.config.prefix}help `, type: 3 });
        console.log('Successfully connected to Discord.');
        const wait = require('util').promisify(setTimeout);
        wait(5000);
        const invites = {};
        this.bot.guilds.forEach(g => {
            g.getInvites().then(guildInvites => {
                invites[g.id] = guildInvites
            });
        });
        this.bot.invites = invites;
    }
}

module.exports = Ready;