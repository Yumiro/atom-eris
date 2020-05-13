const UserSchema = require("../Schemas/user");
const GuildSchema = require("../Schemas/guild");
class messageCreate {
    constructor(bot) {
        this.bot = bot
    }
    async run(msg) {
        if (msg.author.bot || msg.channel.type === 'dm') return;
        if(await this.bot.userDB.countDocuments({"_id": msg.author.id}, {limit: 1}).then(r => r === 0)) {
            this.bot.userDB.insertOne(UserSchema(msg.author))   
        }
        if(await this.bot.guildDB.countDocuments({"_id": msg.channel.guild.id}, {limit: 1}).then(r => r === 0)) {
            this.bot.guildDB.insertOne(GuildSchema(msg.channel.guild))   
        }
        const {
            levels: {
                xp
            }
        } = await this.bot.userDB.findOne({"_id": msg.author.id})
        await this.bot.userDB.updateOne({"_id": msg.author.id}, {$set: {"levels.xp": xp + Math.floor(Math.random() * 10) + 10}})
        if (msg.content.startsWith(require('../config').prefix)) {
            // const command = msg.content.split(' ')[0].slice(2).toLowerCase();
            const args = msg.content.slice(require('../config').prefix.length).split(' ');
            const command = args.shift().toLowerCase();
            if (this.bot.commands.has(command) || this.bot.commands.has(this.bot.aliases.get(command))) {
                const cmd = this.bot.commands.get(command) || this.bot.commands.get(this.bot.aliases.get(command))
                if (!require('../config').developers.includes(msg.author.id) && cmd.config.developer) {
                    msg.channel.createMessage(`${bot.emojiList.error} You're not a Developer.`)
                } else {
                    cmd.run(msg, args);
                }
            };
        };
    }
}


module.exports = messageCreate;
