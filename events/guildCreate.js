class guildCreate {
    constructor(bot) {
        this.bot = bot
    }
    async run(guild) {
        console.log(`Bot joined ${guild.name}`);
        const text = `Thanks for adding Atom. Use \`${this.bot.config.prefix}help\` to see a list of all available commands.`;

        if (guild.members.get(this.bot.user.id).permission.has('sendMessages')) {
            this.bot.createMessage(guild.systemChannelID, {
                embed: {
                    color: bot.embedCOLOR,
                    title: guild.name,
                    footer: {
                        text: this.bot.version,
                        icon_url: this.bot.versionIMG
                    },
                    description: text
                }
            });
        } else {
            this.bot.createMessage(guild.ownerID, `This message has been sent to you since I don't have the \`Send Messages\` permission in your server.`);
            this.bot.createMessage(guild.ownerID, {
                embed: {
                    color: 0x36393f,
                    footer: {
                        text: this.bot.version,
                        icon_url: this.bot.versionIMG
                    },
                    description: text
                }
            });
        };
    }
}

module.exports = guildCreate;