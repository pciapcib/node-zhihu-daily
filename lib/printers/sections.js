const chalk = require('chalk')

const { logger: { print }, pusher } = require('../util')

module.exports = sectionsText => {
  const sectionsArray = []
  const pushSections = pusher(sectionsArray)

  pushSections()
  pushSections('知乎专栏')

  sectionsText.data.forEach((section, index) => {
    index++

    pushSections(`${index < 10 ? ' ' : ''}${index}. ${chalk.bold(section.name)}`, 2, 0)

    if (section.description) {
      pushSections(`，${section.description}`, 0, 0)
    }

    pushSections()
  })

  print(sectionsArray)

  Store.sectionsLength = sectionsText.data.length

  return Prompts.sections()
}
