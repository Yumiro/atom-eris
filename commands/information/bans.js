const Command = require('../../structures/Command');
class Bans extends Command {
    constructor(bot) {
        super(bot, {
            name: 'bans',
            description: 'Lists all bans in the current guild',
            category: '❔ Information',
            aliases: ['listbans', 'baddies'],
            usage: 'bans'
        })
        this.run = async (msg) => {
            msg.channel.guild.getBans().then(b => {
                let bans;
                if (b.length === 0) bans = 'bans';
                if (b.length === 1) bans = 'ban';
                if (b.length > 2) bans = 'bans';

                msg.channel.createMessage({
                    embed: {
                        color: 0x36393f,
                        description: `🔨 This server has ${b.length} ${bans}`,
                        footer: {
                            text: msg.channel.guild.name
                        }
                    }
                });
            });
        };
    };
};

module.exports = Bans;