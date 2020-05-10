const Eris = require('eris');
const config = require("../../config.json")
const { MongoClient } = require("mongodb");
class client extends Eris {
    constructor(options) {
        super(options)
        this.commands = new Map();
        this.aliases = new Map();
        MongoClient.connect(`mongodb://flag:${config.dbPass}@localhost:27017`, (err, client) => { 
            this.userDB = client.db("atom").collection("users");
            this.guildDB = client.db("atom").collection("guilds");
        })
    };
};

module.exports = client;
// mongodb://Oly:123zserdxcft@157.230.232.81:27017/?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false
