const { filter: { addDateLine }, logger: { print }, pusher } = require('../util')

module.exports = newsText => {
  const newsArray = []
  const pushNews = pusher(newsArray)

  pushNews()
  pushNews(`知乎日报  ${addDateLine(newsText.date)}`)

  newsText.stories.forEach((story, index) => {
    index++

    pushNews(`${index < 10 ? ' ' : ''}${index}. ${story.title}`, 2, 1)
  })

  print(newsArray)

  Store.storiesLength = newsText.stories.length

  return Prompts.news()
}
