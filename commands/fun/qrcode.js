const Command = require('../../structures/Command');
class QR extends Command {
    constructor(bot) {
        super(bot, {
            name: 'qrcode',
            description: 'Generates a QR code',
            category: '😂 Fun',
            aliases: ['qr'],
            usage: 'qrcode [text]'
        })
        this.run = async (msg, args) => {
            if (args) {
                msg.channel.createMessage({
                    embed: {
                        color: bot.embedCOLOR,
                        image: {
                            url: `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(args)}`
                        }
                    }
                });
            } else {
                msg.channel.createMessage(`${bot.emojiList.error} No text specified.`);
            };
        };
    };
};

module.exports = QR;