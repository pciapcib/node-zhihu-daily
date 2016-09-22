const chalk = require('chalk')

const { logger: { print }, pusher } = require('../util')

module.exports = themesText => {
  const themesArray = []
  const pushThemes = pusher(themesArray)

  pushThemes()
  pushThemes('主题日报')

  themesText.others.forEach((theme, index) => {
    index++

    pushThemes(`${index < 10 ? ' ' : ''}${index}. ${chalk.bold(theme.name)}，${theme.description}`, 2, 1)
  })

  print(themesArray)

  Store.themesLength = themesText.others.length

  Prompts.themes()
}
