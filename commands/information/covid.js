const fetch = require('node-fetch');

const Command = require('../../structures/Command');
class COVID extends Command {
    constructor(bot) {
        super(bot, {
            name: 'covid',
            description: 'Displays information about the 2019-2020 Coronavirus disease.',
            category: '❔ Information',
            aliases: ['coronavirus', 'covid-19', 'covid19', 'ncov', 'cov'],
            usage: 'covid [country]'
        })
        this.run = async (msg, args) => {
            if (args[0]) {
                try {
                    const result = await fetch("https://disease.sh/v2/countries/" + args.join("%20").toLowerCase()).then((res) => res.json());
                    msg.channel.createMessage({
                        embed: {
                            color: bot.embedCOLOR,
                            title: `COVID-19 Statistics for ${result.country}`,
                            fields: [{
                                    name: "Total Cases",
                                    value: numberThing(result.cases),
                                    inline: true
                                }, {
                                    name: "New Cases",
                                    value: numberThing(result.todayCases),
                                    inline: true,
                                }, {
                                    name: "Total Deaths",
                                    value: numberThing(result.deaths),
                                    inline: true,
                                }, {
                                    name: "New Deaths",
                                    value: numberThing(result.todayDeaths),
                                    inline: true
                                },
                                {
                                    name: "Total Recovered",
                                    value: numberThing(result.recovered),
                                    inline: true
                                }
                            ]
                        }
                    });
                } catch (e) {
                    msg.channel.createMessage({
                        embed: {
                            color: bot.embedCOLOR,
                            description: `${bot.emojiList.error} Couldn't find the country you were looking for.`
                        }
                    });
                };
            } else {
                const result = await fetch("https://disease.sh/v2/all").then((res) => res.json());
                msg.channel.createMessage({
                    embed: {
                        color: bot.embedCOLOR,
                        title: "COVID-19 Global Statistics",
                        fields: [{
                            name: "Total Cases",
                            value: numberThing(result.cases),
                            inline: true
                        }, {
                            name: "Total Deaths",
                            value: numberThing(result.deaths),
                            inline: true
                        }, {
                            name: "Total Recovered",
                            value: numberThing(result.recovered),
                            inline: true
                        }],
                    }
                });
            };
        }
    }
}

module.exports = COVID;
