const Command = require('../../structures/Command');
class Clear extends Command {
    constructor(bot) {
        super(bot, {
            name: 'clear',
            description: 'Clears up to 100 messages in the current channel',
            category: '🔨 Moderation',
            aliases: ['clean', 'prune', 'purge'],
            usage: 'clear <number>'
        })
        this.run = async (msg, args) => {
            if (!isNaN(args) && args <= 100 && args >= 1) {
                if (msg.member.permission.has('manageMessages')) {
                        await msg.delete().then(() => {
                            msg.channel.purge(args);
                        });
                } else {
                    msg.channel.createMessage(`${this.bot.emojiList.error} You don't have the \`Manage Messages\` permission.`);
                };
            } else {
                msg.channel.createMessage(`${this.bot.emojiList.error} Choose a number between 1 and 100.`);
            };
        }
    }
}

module.exports = Clear;