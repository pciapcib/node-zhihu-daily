const fs = require('fs')
const path = require('path')

const Crawler = require('./queen')
const { logger: { error } } = require('../util')

const cachedPath = '../../cached.json'

const cached = require(cachedPath)

module.exports = storyNumber => {
  let newsStories

  if (Store.backPrompt === 'news') {
    newsStories = require(`../../cache/news-${Store.newsDate}.json`)
  } else {
    newsStories = require('../../cache/latest.json')
  }

  const storyId = newsStories.stories[storyNumber - 1].id
  const cachePath = `../../cache/story-${storyId}.json`

  if (cached.stories.includes(storyId)) {
    return new Promise(resolve => {
      const cachedStory = require(cachePath)

      resolve(cachedStory)
    })
      .then(res => {
        Printers.story(res)
      })
  } else {
    return new Crawler(`news/${storyId}`)
      .fetch()
      .then(res => {
        fs.writeFile(path.resolve(__dirname, cachePath), JSON.stringify(res), 'utf-8', err => {
          if (err) error(err)

          cached.stories.push(storyId)

          fs.writeFileSync(path.resolve(__dirname, cachedPath), JSON.stringify(cached))

          Printers.story(res)
        })
      })
  }
}
