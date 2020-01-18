const Eris = require('eris');

class client extends Eris {
    constructor(options) {
        super(options)
        this.commands = new Map();
        this.aliases = new Map();
    };
};

module.exports = client;