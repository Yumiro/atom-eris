class guildDelete {
    constructor(bot) {
        this.bot = bot
    }
    async run(guild) {
        console.log(`Bot left ${guild.name}`);
    }
}

module.exports = guildDelete;