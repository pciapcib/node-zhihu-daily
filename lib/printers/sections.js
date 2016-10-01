const chalk = require('chalk')

const { logger: { print }, pusher, table } = require('../util')

module.exports = sectionsText => {
  const sectionsArray = []
  const pushSections = pusher(sectionsArray)

  pushSections()
  pushSections('知乎专栏')

  const t = table(sectionsText.data.map((section, index) => {
    let sectionName = chalk.bold(section.name)

    if (section.description) {
      sectionName += `，${section.description}`
    }

    return [`${++index}.`, sectionName]
  }))

  pushSections(t, 0, 1)

  print(sectionsArray)

  Store.sectionsLength = sectionsText.data.length

  return Prompts.sections()
}
