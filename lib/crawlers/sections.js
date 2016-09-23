const fs = require('fs')
const path = require('path')

const Crawler = require('./queen')
const { logger: { error } } = require('../util')

const cachedPath = '../../cached.json'
const cachePath = '../../cache/sections.json'

const cached = require(cachedPath)

module.exports = () => {
  if (cached.sections) {
    return new Promise(resolve => {
      const cachedSections = require(cachePath)

      resolve(cachedSections)
    })
      .then(res => {
        return Printers.sections(res)
      })
  } else {
    return new Crawler('sections', 3)
      .fetch()
      .then(res => {
        fs.writeFile(path.resolve(__dirname, cachePath), JSON.stringify(res), err => {
          if (err) error(err)

          cached.sections = true

          fs.writeFileSync(path.resolve(__dirname, cachedPath), JSON.stringify(cached))

          return Printers.sections(res)
        })
      })
  }
}
