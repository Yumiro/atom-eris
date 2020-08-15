const Command = require('../../structures/Command');
const req = require('superagent');
class APOD extends Command {
    constructor(bot) {
        super(bot, {
            name: 'apod',
            description: 'Sends an astronomy picture of the day taken from NASA',
            category: '😂 Fun',
            aliases: ['apotd', 'nasa-apod', 'nasa-astronomy', 'astronomypictureoftheday', 'astronomy-picture-of-the-day'],
            usage: 'apod'
        })
        this.run = async (msg) => {
            req.get(`https://api.nasa.gov/planetary/apod`).query({
                hd: true,
                api_key: bot.config.nasaAPI
            }).set('User-Agent', 'atom-eris').end((err, res) => {
                if (!err && res.ok) {
                    var img = res.body.hdurl;
                    var desc = res.body.explanation;
                    var title = res.body.title;
                    var date = res.body.date;

                    msg.channel.createMessage({
                        embed: {
                            color: bot.embedCOLOR,
                            title: title,
                            description: desc,
                            footer: {
                                text: date
                            },
                            image: {
                                url: img
                            },
                        }
                    });
                }
            });
        }
    }
}

module.exports = APOD;