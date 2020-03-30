class messageDelete {
    constructor(bot) {
        this.bot = bot
    }
    async run(msg) {
        const channel = this.bot.guilds.find(f => f.name === 'atom/dev').channels.find(f => f.id === '613783535630680076');
        console.log(msg.author);

        if (msg.author.bot) return;
        
        channel.createMessage({
            embed: {
                color: bot.embedCOLOR,
                title: 'Message Deleted',
                fields: [{
                    name: 'User',
                    value: `${msg.author.username}#${msg.author.discriminator} (${msg.author.id})`
                }, {
                    name: 'Message',
                    value: msg.content
                }]
            }
        });
    }
}


module.exports = messageDelete;