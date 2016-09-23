const fs = require('fs')
const path = require('path')

const Crawler = require('./queen')
const { logger: { error } } = require('../util')

const cachedPath = '../../cached.json'

const cached = require(cachedPath)

module.exports = (storyNumber, backPrompt) => {
  let storyId

  if (storyNumber) {
    let stories

    switch (Store.from) {
      case 'latest':
        stories = require('../../cache/latest.json')

        break
      case 'news':
        stories = require(`../../cache/news-${Store.newsDate}.json`)

        break

      case 'theme':
        stories = require(`../../cache/theme-${Store.themeId}.json`)

        break

      case 'section':
        stories = require(`../../cache/section-${Store.sectionId}.json`)
    }

    storyId = stories.stories[storyNumber - 1].id
  } else {
    storyId = Store.storyId
  }

  const cachePath = `../../cache/story-${storyId}.json`

  if (cached.stories.includes(storyId)) {
    return new Promise(resolve => {
      const cachedStory = require(cachePath)

      resolve(cachedStory)
    })
      .then(res => {
        return Printers.story(res)
      })
  } else {
    return new Crawler(`news/${storyId}`)
      .fetch()
      .then(res => {
        fs.writeFile(path.resolve(__dirname, cachePath), JSON.stringify(res), err => {
          if (err) error(err)

          cached.stories.push(storyId)

          fs.writeFileSync(path.resolve(__dirname, cachedPath), JSON.stringify(cached))

          return Printers.story(res)
        })
      })
  }
}
