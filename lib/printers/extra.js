const { logger: { print }, pusher } = require('../util')

module.exports = extraText => {
  const {
    popularity,
    long_comments: longComments,
    short_comments: shortComments
   } = extraText
  const backPromptsArray = []

  if (popularity) {
    const extraArray = []
    const pushExtra = pusher(extraArray)

    pushExtra(`有 ${popularity} 人点赞`, 2, 1)

    print(extraArray)
  }

  if (longComments) {
    backPromptsArray.push({
      name: '查看长评论',
      value: 'longComments'
    })
  }

  if (shortComments) {
    backPromptsArray.push({
      name: '查看短评论',
      value: 'shortComments'
    })
  }

  if (Store.section) {
    backPromptsArray.push({
      name: '查看专栏',
      value: 'section'
    })
  }

  Prompts.back(backPromptsArray)
}
