const fs = require('fs')
const path = require('path')

const Crawler = require('./queen')
const { filter: { date }, logger: { print, error }, pusher } = require('../util')

const cachePath = '../../cache/latest.json'

let isLatestCached = false

module.exports = () => {
  if (isLatestCached) {
    return new Promise(resolve => {
      const cachedLatest = require(cachePath)

      resolve(JSON.stringify(cachedLatest))
    })
      .then(res => {
        printLatest(res)
      })
  }

  return new Crawler('news/latest')
    .fetch()
    .then(res => {
      fs.writeFile(path.resolve(__dirname, cachePath), res, 'utf-8', err => {
        if (err) error(err)

        isLatestCached = true

        printLatest(res)
      })
    })
}

function printLatest (res) {
  const latestText = JSON.parse(res)

  const latestArray = []
  const pushLatest = pusher(latestArray)

  pushLatest()
  pushLatest(`知乎日报  ${date(latestText.date)}`)

  latestText.stories.forEach((story, index) => {
    index++

    pushLatest(`${index < 10 ? ' ' : ''}${index}. ${story.title}`, 2, 1)
  })

  print(latestArray)

  Prompts.latest(latestText.stories.length)
}
