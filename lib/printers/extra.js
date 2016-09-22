const { logger: { print }, pusher } = require('../util')

module.exports = extraText => {
  if (extraText.popularity) {
    const extraArray = []
    const pushExtra = pusher(extraArray)

    pushExtra(`有 ${extraText.popularity} 人点赞`, 2, 1)

    print(extraArray)
  }

  Prompts.story(extraText)
}
