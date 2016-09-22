const { logger: { print }, pusher } = require('../util')

module.exports = extraText => {
  const {
    popularity,
    long_comments: longComments,
    short_comments: shortComments
   } = extraText
  const storyChioces = []

  if (popularity) {
    const extraArray = []
    const pushExtra = pusher(extraArray)

    pushExtra(`有 ${popularity} 人点赞`, 2, 1)

    print(extraArray)
  }

  if (longComments) {
    storyChioces.push({
      name: '查看长评论',
      value: 'longComments'
    })
  }

  if (shortComments) {
    storyChioces.push({
      name: '查看短评论',
      value: 'shortComments'
    })
  }

  if (Store.sectionId) {
    storyChioces.push({
      name: '查看专栏',
      value: 'section'
    })
  }

  Prompts.back(storyChioces)
}
