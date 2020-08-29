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
                    msg.addReaction('👎');
                } else {
                    console.log(stdout);
                    msg.addReaction('👍');
                };
            });
        }
    }
}

module.exports = Update;