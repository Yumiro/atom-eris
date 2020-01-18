const Command = require('../../structures/Command');
class Avatar extends Command {
    constructor(bot) {
        super(bot, {
            name: 'avatar',
            description: 'View the avatar of yourself, or a specific user',
            category: '❔ Information',
            aliases: ['av', 'pfp'],
            usage: 'avatar [user]'
        })
        this.run = async (msg) => {
            const user = msg.mentions[0] || msg.author;

            msg.channel.createMessage({
                embed: {
                    color: 0x36393f,
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