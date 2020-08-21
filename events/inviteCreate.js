class inviteCreate {
    constructor(bot) {
        this.bot = bot
    }
    async run(guild, invite) {
        if (guild.id === '637862268662710322') {
            this.bot.invites[guild.id] = invite
        };
    }
}

module.exports = inviteCreate;