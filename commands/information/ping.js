const Command = require('../../structures/Command');
class Ping extends Command {
    constructor(bot) {
        super(bot, {
            name: 'ping',
            description: 'View the ping of the bot',
            category: '❔ Information',
            aliases: ['pong', 'latency', 'pingpong'],
            usage: 'ping'
        })
        this.run = async (msg) => {
            msg.channel.createMessage({
                embed: {
                    color: 0x36393f,
                    description: `⌛ ${this.bot.shards.get(0).latency}ms`
                }
            });
        };
    };
};

module.exports = Ping;