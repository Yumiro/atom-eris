const Command = require('../../structures/Command');
class Dick extends Command {
    constructor(bot) {
        super(bot, {
            name: 'dick',
            description: 'Displays your dick\'s size, or a specific user\'s',
            category: '😂 Fun',
            aliases: ['pp', 'cock'],
            usage: 'dick [user]'
        })
        this.run = async (msg) => {
            const user = msg.mentions[0] || msg.author;
            const size = user.id.slice(-3) % 20 + 1;

            msg.channel.createMessage({
                embed: {
                    color: 0x36393f,
                    title: size + 'cm',
                    description: 8 + '='.repeat(size) + 'D'
                }
            });
        };
    };
};

module.exports = Dick;