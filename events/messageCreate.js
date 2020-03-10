class messageCreate {
    constructor(bot) {
        this.bot = bot
    }
    async run(msg) {
        if (msg.author.bot || msg.channel.type === 'dm') return;
        if(await this.bot.userDB.countDocuments({"_id": msg.author.id}, {limit: 1}).then(r => r === 0)) {
            this.bot.userDB.insertOne({"_id": message.author.id, level: null, xp: null})   
        }
        if (msg.content.startsWith(require('../config').prefix)) {
            // const command = msg.content.split(' ')[0].slice(2).toLowerCase();
            const args = msg.content.slice(require('../config').prefix.length).split(' ');
            const command = args.shift().toLowerCase();
            if (this.bot.commands.has(command) || this.bot.commands.has(this.bot.aliases.get(command))) {
                const cmd = this.bot.commands.get(command) || this.bot.commands.get(this.bot.aliases.get(command))
                if (!require('../config').developers.includes(msg.author.id) && cmd.config.developer) {
                    msg.channel.createMessage('You do not have permission to run that command!')
                } else {
                    cmd.run(msg, args);
                }
            };
        };
    }
}


module.exports = messageCreate;
