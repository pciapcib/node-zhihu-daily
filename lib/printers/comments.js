const chalk = require('chalk')

const { logger: { print }, pusher } = require('../util')

module.exports = ({ comments }) => {
  const commentsArray = []
  const pushComments = pusher(commentsArray)

  pushComments()

  comments.forEach((comment, index) => {
    if (!index) {
      pushComments('------------------------------')
    }

    pushComments(chalk.bold(comment.author))
    pushComments(comment.content)

    const { reply_to: replyTo } = comment

    if (replyTo) {
      pushComments(chalk.bold(`//${replyTo.author}：`) + replyTo.content)
    }

    pushComments(commentDate(comment.time))

    if (comment.likes) {
      pushComments(`有 ${comment.likes} 人点赞`)
    }

    pushComments('------------------------------')
  })

  print(commentsArray)

  Store.backPrompts.unshift('story')

  Prompts.back()
}

function commentDate (timestamp) {
  return new Date(timestamp * 1000).toLocaleString()
}
