const fs = require('fs')
const path = require('path')

const Crawler = require('./queen')
const { logger: { error } } = require('../util')

const sectionsCache = []

module.exports = sectionsNumber => {
  Store.from = 'section'

  let sectionId

  if (sectionsNumber) {
    const sections = require('../../cache/sections.json')

    sectionId = sections.data[sectionsNumber - 1].id

    Store.sectionId = sectionId
  } else {
    sectionId = Store.sectionId
  }

  const cachePath = `../../cache/section-${sectionId}.json`

  if (sectionsCache.includes(sectionId)) {
    return new Promise(resolve => {
      const cachedSection = require(cachePath)

      resolve(cachedSection)
    })
      .then(res => {
        return Printers.section(res)
      })
  } else {
    return new Crawler(`section/${sectionId}`, 3)
      .fetch()
      .then(res => {
        fs.writeFile(path.resolve(__dirname, cachePath), JSON.stringify(res), err => {
          if (err) error(err)

          sectionsCache.push(sectionId)

          return Printers.section(res)
        })
      })
  }
}
