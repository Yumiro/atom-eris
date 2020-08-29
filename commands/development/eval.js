const Command = require('../../structures/Command');
const {
    inspect
} = require('util');
class Eval extends Command {
    constructor(bot) {
        super(bot, {
            name: 'eval',
            description: 'Evaluates JavaScript code',
            category: '🧪 Development',
            aliases: ['code', 'js'],
            usage: 'eval <code>',
            developer: true
        })
        this.run = async (msg, args) => {
        var message = msg
            if (!args[0]) {
                this.bot.createMessage(msg.channel.id, `${this.bot.emojiList.error} Are you expecting me to evaluate nothing?`);
            } else if (args[0]) {
                if (require('../../config').developers.includes(msg.author.id)) {
                    this.bot.createMessage(msg.channel.id, `**Input:**\n\`\`\`js\n${args.join(" ")}\n\`\`\``)
                        .then((m) => {
                            var code = eval(args.join(" "));
                            if (args.includes('bot.token')) {
                                return;
                            }
                            if (args.includes('bot.config')) {
                                return;
                            }
                            m.edit(`**Input:**\n\`\`\`js\n${args.join(" ")}\n\`\`\` \n` + `**Output:**\n\`\`\`js\n${inspect(code, {compact: true, depth: 0})}\n\`\`\` \n`).catch(err => {
                                this.bot.createMessage(msg.channel.id, `\`\`\`js\n${err}\n\`\`\``)
                            });
                        }).catch(err => {
                            this.bot.createMessage(msg.channel.id, `\`\`\`js\n${err}\n\`\`\``)
                        });
                } else {
                    return;
                };
            };
        }
    }
}

module.exports = Eval;
