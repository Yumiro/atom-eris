module.exports = (user) => {
  return {
    "_id": user.id,
    levels: {
      xp: 0,
      level: 0
    }
  }
}
