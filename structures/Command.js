class Command {
    constructor(bot, {
        name = null,
        description = 'None provided',
        usage = 'None provided',
        category = 'None provided',
        aliases = new Array(),
        botPerms = new Array(),
        userPerms = new Array(),
        developer = false,
    }) {
        this.bot = bot
        this.help = {
            name,
            description,
            category,
            usage
        }
        this.config = {
            botPerms,
            userPerms,
            aliases,
            developer
        };
    }
}

module.exports = Command;