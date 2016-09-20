const fs = require('fs')
const path = require('path')

const Crawler = require('./queen')
const { filter: { rmDateLine }, logger: { error } } = require('../util')

const cachedPath = '../../cached.json'

const cached = require(cachedPath)

module.exports = date => {
  date = rmDateLine(date)

  const cachePath = `../../cache/news-${date}.json`

  if (cached.news.includes(date)) {
    return new Promise(resolve => {
      const cachedNews = require(cachePath)

      resolve(cachedNews)
    })
      .then(res => {
        Store.backPrompt = 'news'

        Printers.news(res)
      })
  } else {
    return new Crawler(`news/before/${Number(date) + 1}`)
      .fetch()
      .then(res => {
        fs.writeFile(path.resolve(__dirname, cachePath), JSON.stringify(res), 'utf-8', err => {
          if (err) error(err)

          cached.news.push(date)

          fs.writeFileSync(path.resolve(__dirname, cachedPath), JSON.stringify(cached))

          Store.backPrompt = 'news'

          Printers.news(res)
        })
      })
  }
}
