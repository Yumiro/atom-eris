const Command = require('../../structures/Command');
class Avatar extends Command {
    constructor(bot) {
        super(bot, {
            name: 'avatar',
            description: 'Displays your avatar, or a specific user\'s one',
            category: '❔ Information',
            aliases: ['av', 'pfp'],
            usage: 'avatar [user]'
        })
        this.run = async (msg) => {
            const user = msg.mentions[0] || msg.author;

            msg.channel.createMessage({
                embed: {
                    color: bot.embedCOLOR,
                    author: {
                        name: user.username + '\'s ' + 'Avatar',
                        url: user.dynamicAvatarURL('jpg', '2048') || user.defaultAvatarURL
                    },
                    image: {
                        url: user.dynamicAvatarURL('jpg', '2048') || user.defaultAvatarURL
                    }
                }
            })
        };
    };
};

module.exports = Avatar;