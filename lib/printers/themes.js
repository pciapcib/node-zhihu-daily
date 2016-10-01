const chalk = require('chalk')

const { logger: { print }, pusher, table } = require('../util')

module.exports = themesText => {
  const themesArray = []
  const pushThemes = pusher(themesArray)

  pushThemes()
  pushThemes('主题日报')

  const t = table(themesText.others.map((theme, index) =>
    [`${++index}.`, `${chalk.bold(theme.name)}，${theme.description}`]))

  pushThemes(t, 0, 1)

  print(themesArray)

  Store.themesLength = themesText.others.length

  return Prompts.themes()
}
