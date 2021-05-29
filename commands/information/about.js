const req = require('node-superfetch');
const Command = require('../../structures/Command');
class About extends Command {
    constructor(bot) {
        super(bot, {
            name: 'about',
            description: 'Sends information about the bot',
            category: '❔ Information',
            aliases: ['bot', 'changelog'],
            usage: 'about'
        })
        this.run = async (msg) => {
            const {
                body
            } = await req.get('https://api.github.com/repos/Yumiro/atom-eris/commits');

            msg.channel.createMessage({
                embed: {
                    author: {
                        name: 'Changelog'
                    },
                    color: bot.embedCOLOR,
                    fields: [{
                        name: `\`${body[0].sha.substring(0, 7)}\` by ${body[0].commit.author.name}`,
                        value: `[${body[0].commit.message}](https://github.com/Yumiro/atom-eris/commit/${body[0].sha.substring(0, 7)})`
                    }, {
                        name: `\`${body[1].sha.substring(0, 7)}\` by ${body[1].commit.author.name}`,
                        value: `[${body[1].commit.message}](https://github.com/Yumiro/atom-eris/commit/${body[1].sha.substring(0, 7)})`
                    }, {
                        name: `\`${body[2].sha.substring(0, 7)}\` by ${body[2].commit.author.name}`,
                        value: `[${body[2].commit.message}](https://github.com/Yumiro/atom-eris/commit/${body[2].sha.substring(0, 7)})`
                    }, {
                        name: `\`${body[3].sha.substring(0, 7)}\` by ${body[3].commit.author.name}`,
                        value: `[${body[3].commit.message}](https://github.com/Yumiro/atom-eris/commit/${body[3].sha.substring(0, 7)})`
                    }, {
                        name: `\`${body[4].sha.substring(0, 7)}\` by ${body[4].commit.author.name}`,
                        value: `[${body[4].commit.message}](https://github.com/Yumiro/atom-eris/commit/${body[4].sha.substring(0, 7)})`
                    }, {
                        name: 'Library',
                        value: 'Eris'
                    }, {
                        name: 'People',
                        value: `Head Developer - ${bot.users.get('458659194707640321').username}#${bot.users.get('458659194707640321').discriminator}\nDeveloper - ${bot.users.get('621154191192096778').username}#${bot.users.get('621154191192096778').discriminator}\nContributor - ${bot.users.get('593510080528515072').username}#${bot.users.get('593510080528515072').discriminator}`
                    }],
                    footer: {
                        text: `${bot.version} • showing latest 5 commits • special thanks to oly for literally every piece of code in here`
                    }
                }
            });
        }
    }
}

module.exports = About;
