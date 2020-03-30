class messageDeleteBulk {
    constructor(bot) {
        this.bot = bot
    }
    async run(msgs) {
        const channel = this.bot.guilds.find(f => f.name === 'atom/dev').channels.find(f => f.id === '613783535630680076');
        channel.createMessage({
            embed:{
                color: bot.embedCOLOR   ,
                title: 'Message Delete Bulk',
                fields: [{
                    name: 'Amount',
                    value: msgs.length + ' messages'
                }]
            }
        });
    }
}


module.exports = messageDeleteBulk;