const fs = require('fs')
const path = require('path')

const Crawler = require('./queen')
const { logger: { error } } = require('../util')

const cachedPath = '../../cached.json'

const cached = require(cachedPath)

module.exports = () => {
  Store.from = 'news'

  const newsDate = Store.newsDate
  const cachePath = `../../cache/news-${newsDate}.json`

  if (cached.news.includes(newsDate)) {
    return new Promise(resolve => {
      const cachedNews = require(cachePath)

      resolve(cachedNews)
    })
      .then(res => {
        return Printers.news(res)
      })
  } else {
    return new Crawler(`news/before/${newsDate + 1}`)
      .fetch()
      .then(res => {
        fs.writeFile(path.resolve(__dirname, cachePath), JSON.stringify(res), err => {
          if (err) error(err)

          cached.news.push(newsDate)

          fs.writeFileSync(path.resolve(__dirname, cachedPath), JSON.stringify(cached))

          return Printers.news(res)
        })
      })
  }
}
