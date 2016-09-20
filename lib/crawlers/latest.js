const fs = require('fs')
const path = require('path')

const Crawler = require('./queen')
const { logger: { error } } = require('../util')

const cachePath = '../../cache/latest.json'

let isLatestCached = false

module.exports = () => {
  if (isLatestCached) {
    return new Promise(resolve => {
      const cachedLatest = require(cachePath)

      resolve(cachedLatest)
    })
      .then(res => {
        Store.backPrompt = 'latest'

        Printers.news(res)
      })
  }

  return new Crawler('news/latest')
    .fetch()
    .then(res => {
      fs.writeFile(path.resolve(__dirname, cachePath), JSON.stringify(res), 'utf-8', err => {
        if (err) error(err)

        isLatestCached = true

        Store.backPrompt = 'latest'

        Printers.news(res)
      })
    })
}
