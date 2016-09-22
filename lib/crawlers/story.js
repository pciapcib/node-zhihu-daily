const fs = require('fs')
const path = require('path')

const Crawler = require('./queen')
const { logger: { error } } = require('../util')

const cachedPath = '../../cached.json'

const cached = require(cachedPath)

module.exports = (storyNumber, backPrompt) => {
  let storyId = 0
  let backPipe = false

  if (backPrompt) {
    Store.backPrompts.unshift(backPrompt)
  }

  if (Store.backPrompts[0] === 'story') {
    storyId = Store.storyId

    Store.backPrompts.shift()

    backPipe = true
  } else {
    let stories

    if (Store.backPrompts[0] === 'latest') {
      stories = require('../../cache/latest.json')
    } else if (Store.backPrompts[0] === 'news') {
      stories = require(`../../cache/news-${Store.newsDate}.json`)
    } else if (Store.backPrompts[0] === 'theme') {
      stories = require(`../../cache/theme-${Store.themeId}.json`)
    }

    storyId = stories.stories[storyNumber - 1].id

    if (backPipe) {
      Store.backPrompts.shift()

      backPipe = false
    }
  }

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
        fs.writeFile(path.resolve(__dirname, cachePath), JSON.stringify(res), err => {
          if (err) error(err)

          cached.stories.push(storyId)

          fs.writeFileSync(path.resolve(__dirname, cachedPath), JSON.stringify(cached))

          Printers.story(res)
        })
      })
  }
}
