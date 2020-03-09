const Eris = require('eris');
const { MongoClient } = require("mongodb");
class client extends Eris {
    constructor(options) {
        super(options)
        this.commands = new Map();
        this.aliases = new Map();
        MongoClient.connect("mongodb://localhost:27017", (err, client) => { 
            this.userDB = client.db("atom").collection("users");
            this.guildDB = client.db("atom").collection("guilds");
        })
    };
};

module.exports = client;
