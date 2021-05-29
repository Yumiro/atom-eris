class Ready {
    constructor(bot) {
        this.bot = bot
    }
    async run() {
        this.bot.editStatus('invisible'/*, { name: `over ${this.bot.guilds.size} guilds • ${this.bot.config.prefix}help `, type: 3 }*/);
        console.log('Successfully connected to Discord.');
        
        const wait = require('util').promisify(setTimeout);
        wait(1000);

        this.bot.guilds.forEach(g => {
            g.getInvites().then(guildInvites => {
                this.bot.invites[g.id] = guildInvites;
            });
        });
    }
}

module.exports = Ready;
