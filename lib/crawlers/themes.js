const fs = require('fs')
const path = require('path')

const Crawler = require('./queen')
const { logger: { error } } = require('../util')

const cachedPath = '../../cached.json'
const cachePath = '../../cache/themes.json'

const cached = require(cachedPath)

module.exports = () => {
  Store.backPrompts.unshift('themes')

  if (cached.themes) {
    return new Promise(resolve => {
      const cachedThemes = require(cachePath)

      resolve(cachedThemes)
    })
      .then(res => {
        Printers.themes(res)
      })
  } else {
    return new Crawler('themes')
      .fetch()
      .then(res => {
        fs.writeFile(path.resolve(__dirname, cachePath), JSON.stringify(res), err => {
          if (err) error(err)

          cached.themes = true

          fs.writeFileSync(path.resolve(__dirname, cachedPath), JSON.stringify(cached))

          Printers.themes(res)
        })
      })
  }
}
