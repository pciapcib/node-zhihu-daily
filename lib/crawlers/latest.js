const fs = require('fs')
const path = require('path')

const Crawler = require('./queen')
const { logger: { error } } = require('../util')

const cachePath = '../../cache/latest.json'

let isLatestCached = false

module.exports = () => {
  Store.from = 'latest'

  if (isLatestCached) {
    return new Promise(resolve => {
      const cachedLatest = require(cachePath)

      resolve(cachedLatest)
    })
      .then(res => {
        Printers.news(res)
      })
  } else {
    return new Crawler('news/latest')
      .fetch()
      .then(res => {
        fs.writeFile(path.resolve(__dirname, cachePath), JSON.stringify(res), err => {
          if (err) error(err)

          isLatestCached = true

          Printers.news(res)
        })
      })
  }
}
