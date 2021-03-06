const fs = require('fs')
const path = require('path')

const Crawler = require('./queen')
const { logger: { error } } = require('../util')

const cachedPath = '../../cached.json'
const cachePath = '../../cache/themes.json'

const cached = require(cachedPath)

module.exports = () => {
  if (cached.themes) {
    return new Promise(resolve => {
      const cachedThemes = require(cachePath)

      resolve(cachedThemes)
    })
      .then(res => {
        return Printers.themes(res)
      })
  } else {
    return new Crawler('themes')
      .fetch()
      .then(res => {
        fs.writeFile(path.resolve(__dirname, cachePath), JSON.stringify(res), err => {
          if (err) error(err)

          cached.themes = true

          fs.writeFileSync(path.resolve(__dirname, cachedPath), JSON.stringify(cached))

          return Printers.themes(res)
        })
      })
  }
}
