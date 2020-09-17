module.exports = (guild) => {
  return {
     _id: guild.id,
    prefix: "/",
    modlogs: new Array(),
    channels: {
      modlog: null,
      welcome: null,
    },
    log: { // what to log
      deletes: false, // log deleted messages
      joins: false,   // log member joins
      leaves: false,  // log member leaves
      kicks: false,   // log when a user gets kicked
      bans: false     // log when a member is banned
    },
    
  }
}
