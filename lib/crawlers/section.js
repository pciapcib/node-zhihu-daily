const fs = require('fs')
const path = require('path')

const Crawler = require('./queen')
const { logger: { error } } = require('../util')

const sectionsCache = []

module.exports = sectionsNumber => {
  let sectionId = 0
  let backPipe = false

  if (Store.backPrompts[0] === 'section') {
    sectionId = Store.sectionId

    Store.backPrompts.shift()

    backPipe = true
  } else {
    const sections = require('../../cache/sections.json')

    sectionId = sections.data[sectionsNumber - 1].id

    Store.sectionId = sectionId

    if (backPipe) {
      Store.backPrompts.shift()

      backPipe = false
    }
  }
  console.log(sectionId)
  const cachePath = `../../cache/section-${sectionId}.json`

  if (sectionsCache.includes(sectionId)) {
    return new Promise(resolve => {
      const cachedSection = require(cachePath)

      resolve(cachedSection)
    })
      .then(res => {
        Printers.section(res)
      })
  } else {
    return new Crawler(`section/${sectionId}`, 3)
      .fetch()
      .then(res => {
        fs.writeFile(path.resolve(__dirname, cachePath), JSON.stringify(res), err => {
          if (err) error(err)

          sectionsCache.push(sectionId)

          Printers.section(res)
        })
      })
  }
}
