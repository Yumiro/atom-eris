const {
    exec
} = require('child_process');
const Command = require('../../structures/Command');
class Update extends Command {
    constructor(bot) {
        super(bot, {
            name: 'update',
            description: 'Updates the bot',
            category: '🧪 Development',
            aliases: ['u', 'pull'],
            usage: 'update',
            developer: true
        })
        this.run = async (msg) => {
            exec('git pull', {
                cwd: __dirname
            }, (err, stdout, stderr) => {
                if (err) {
                    console.error(err);
                    msg.channel.createMessage(`${this.bot.emojiList.error} Something went wrong. Check the console for any errors.`);
                } else {
                    msg.channel.createMessage(`${this.bot.emojiList.check} I am now up to date.`);
                    console.log(stdout);
                };
            });
        }
    }
}

module.exports = Update;