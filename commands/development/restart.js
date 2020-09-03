const Command = require('../../structures/Command');
class Restart extends Command {
    constructor(bot) {
        super(bot, {
            name: 'restart',
            description: 'Restarts the bot',
            category: '🧪 Development',
            aliases: ['r', 'reboot'],
            usage: 'restart',
            developer: true
        })
        this.run = async (msg) => {
            await msg.addReaction('👍');
            bot.kill()
        }
    }
}

module.exports = Restart;
