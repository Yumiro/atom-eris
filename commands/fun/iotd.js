const Command = require('../../structures/Command');
const Parser = require('rss-parser');
const parser = new Parser();
class IOTD extends Command {
    constructor(bot) {
        super(bot, {
            name: 'iotd',
            description: 'Sends an image of the day taken from NASA',
            category: '😂 Fun',
            aliases: ['nasa-iotd', 'nasaiotd', 'image-of-the-day', 'imageoftheday', 'nasa-image', 'nasaimage'],
            usage: 'iotd'
        })
        this.run = async (msg) => {
            const feed = await parser.parseURL('https://www.nasa.gov/rss/dyn/lg_image_of_the_day.rss');
            const item = feed.items[0];

            msg.channel.createMessage({
                embed: {
                    color: bot.embedCOLOR,
                    title: item.title,
                    description: item.content,
                    url: item.link,
                    image: {
                        url: item.enclosure.url
                    },
                }
            });
        }
    }
}

module.exports = IOTD;