class Ready {
    constructor(bot) {
        this.bot = bot
    }
    async run() {
<<<<<<< HEAD
        this.bot.editStatus('invisible', { name: `over ${this.bot.guilds.size} guilds • ${this.bot.config.prefix}help `, type: 3 });
=======
        this.bot.editStatus('invisible'/*, { name: `over ${this.bot.guilds.size} guilds • ${this.bot.config.prefix}help `, type: 3 }*/);
>>>>>>> 16abd7b5a367a672496d5954e89ccfd421519554
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
