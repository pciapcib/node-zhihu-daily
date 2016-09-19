const { filter: { addDateLine }, logger: { print }, pusher } = require('../util')

module.exports = (newsText, backPrompt, newsDate) => {
  const newsArray = []
  const pushNews = pusher(newsArray)

  pushNews()
  pushNews(`知乎日报  ${addDateLine(newsText.date)}`)

  newsText.stories.forEach((story, index) => {
    index++

    pushNews(`${index < 10 ? ' ' : ''}${index}. ${story.title}`, 2, 1)
  })

  print(newsArray)

  Prompts.news(newsText.stories.length, backPrompt, newsDate)
}
