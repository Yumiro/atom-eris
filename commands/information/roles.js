const Command = require('../../structures/Command');
class Roles extends Command {
    constructor(bot) {
        super(bot, {
            name: 'roles',
            description: 'Lists all the roles in the current guild',
            category: '❔ Information',
            aliases: ['listroles'],
            usage: 'roles'
        })
        this.run = async (msg) => {
            const roles = msg.channel.guild.roles.map(f => f.id).slice(1).sort();
            msg.channel.createMessage({
                embed: {
                    color: bot.embedCOLOR,
                    description: '**<@&' + roles.join('>** **<@&') + '>**'
                }
            });
        };
    };
};

module.exports = Roles;