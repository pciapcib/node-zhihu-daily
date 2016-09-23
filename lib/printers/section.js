const chalk = require('chalk')

const { logger: { print }, pusher } = require('../util')

module.exports = sectionText => {
  const sectionArray = []
  const pushSection = pusher(sectionArray)

  pushSection()
  pushSection(`知乎专栏 · ${chalk.bold(sectionText.name)}`)

  sectionText.stories.forEach((story, index) => {
    index++

    const date = `${story.date.slice(4, 6)} 月 ${story.date.slice(6, 8)} 日`

    pushSection(`${index < 10 ? ' ' : ''}${index}. ${date} ${story.title}`, 2, 1)
  })

  print(sectionArray)

  Store.storiesLength = sectionText.stories.length

  Prompts.section()
}
