module.exports = msgArr =>
  (msg = '', preSpaces = 2, sufNewline = 2) => {
    const prefix = ' '.repeat(preSpaces)
    const suffix = '\n'.repeat(msg ? sufNewline : 1)

    msgArr.push(prefix + msg + suffix)
  }
