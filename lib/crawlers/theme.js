const fs = require('fs')
const path = require('path')

const Crawler = require('./queen')
const { logger: { error } } = require('../util')

const themesCache = []

module.exports = themesNumber => {
  let themeId = 0
  let backPipe = false

  if (Store.backPrompts[0] === 'theme') {
    themeId = Store.themeId

    Store.backPrompts.shift()

    backPipe = true
  } else {
    const themes = require('../../cache/themes.json')

    themeId = themes.others[themesNumber - 1].id

    Store.themeId = themeId

    if (backPipe) {
      Store.backPrompts.shift()

      backPipe = false
    }
  }

  const cachePath = `../../cache/theme-${themeId}.json`

  if (themesCache.includes(themeId)) {
    return new Promise(resolve => {
      const cachedTheme = require(cachePath)

      resolve(cachedTheme)
    })
      .then(res => {
        Printers.theme(res)
      })
  } else {
    return new Crawler(`theme/${themeId}`)
      .fetch()
      .then(res => {
        fs.writeFile(path.resolve(__dirname, cachePath), JSON.stringify(res), err => {
          if (err) error(err)

          themesCache.push(themeId)

          Printers.theme(res)
        })
      })
  }
}
