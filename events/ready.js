class Ready {
    constructor(bot) {
        this.bot = bot
    }
    async run() {
        this.bot.editStatus('online', { name: `${this.bot.config.prefix}help`, type: 3 });
        console.log('Successfully connected to Discord.');
    }
}

module.exports = Ready;