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

                msg.channel.createMessage({
                    embed: {
                        color: bot.embedCOLOR,
                        description: `🔨 This server has ${b.length} ${b.length === 1 ? "ban" : "bans"}`,
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