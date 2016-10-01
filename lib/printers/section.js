const chalk = require('chalk')

const { logger: { print }, pusher, table } = require('../util')

module.exports = sectionText => {
  const sectionArray = []
  const pushSection = pusher(sectionArray)

  pushSection()
  pushSection(`知乎专栏 · ${chalk.bold(sectionText.name)}`)

  const t = table(sectionText.stories.map((story, index) => {
    const date = `${story.date.slice(4, 6)} 月 ${story.date.slice(6, 8)} 日`

    return [`${++index}.`, date, story.title]
  }))

  pushSection(t, 0, 1)

  print(sectionArray)

  Store.storiesLength = sectionText.stories.length

  return Prompts.section()
}
