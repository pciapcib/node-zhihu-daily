const chalk = require('chalk')

const { logger: { print }, pusher, table } = require('../util')

module.exports = themeText => {
  const themeArray = []
  const pushTheme = pusher(themeArray)

  pushTheme()
  pushTheme(`${chalk.bold(themeText.name)}，${themeText.description}`)

  pushTheme('主编')

  themeText.editors.forEach(editor => {
    pushTheme(chalk.bold(editor.name), 4, 0)

    if (editor.bio) {
      pushTheme(`，${editor.bio}(${editor.url})`, 0, 0)
    }

    pushTheme()
  })

  pushTheme()

  const t = table(themeText.stories.map((story, index) => [`${++index}.`, story.title]))

  pushTheme(t, 0, 1)

  print(themeArray)

  Store.storiesLength = themeText.stories.length

  return Prompts.theme()
}
