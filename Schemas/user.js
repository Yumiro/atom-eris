module.exports = (user) => {
  return {
    "_id": user.id,
    levels: {
      xp: 0,
      level: 0
    },
    dick: Math.floor(Math.random() * 13)
  }
}
