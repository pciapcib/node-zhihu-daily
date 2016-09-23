const fs = require('fs')
const path = require('path')

const Crawler = require('./queen')
const { logger: { error } } = require('../util')

const themesCache = []

module.exports = themesNumber => {
  Store.from = 'theme'

  let themeId

  if (themesNumber) {
    const themes = require('../../cache/themes.json')

    themeId = themes.others[themesNumber - 1].id

    Store.themeId = themeId
  } else {
    themeId = Store.themeId
  }

  const cachePath = `../../cache/theme-${themeId}.json`

  if (themesCache.includes(themeId)) {
    return new Promise(resolve => {
      const cachedTheme = require(cachePath)

      resolve(cachedTheme)
    })
      .then(res => {
        return Printers.theme(res)
      })
  } else {
    return new Crawler(`theme/${themeId}`)
      .fetch()
      .then(res => {
        fs.writeFile(path.resolve(__dirname, cachePath), JSON.stringify(res), err => {
          if (err) error(err)

          themesCache.push(themeId)

          return Printers.theme(res)
        })
      })
  }
}
