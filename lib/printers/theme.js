const chalk = require('chalk')

const { logger: { print }, pusher } = require('../util')

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

  themeText.stories.forEach((theme, index) => {
    index++

    pushTheme(`${index < 10 ? ' ' : ''}${index}. ${theme.title}`, 2, 1)
  })

  print(themeArray)

  Store.storiesLength = themeText.stories.length

  Prompts.theme()
}
