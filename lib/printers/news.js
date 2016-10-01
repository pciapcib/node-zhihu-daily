const { filter: { addDateLine }, logger: { print }, pusher, table } = require('../util')

module.exports = newsText => {
  const newsArray = []
  const pushNews = pusher(newsArray)

  pushNews()
  pushNews(`知乎日报  ${addDateLine(newsText.date)}`)

  const t = table(newsText.stories.map((story, index) => [`${++index}.`, story.title]))

  pushNews(t, 0, 1)

  print(newsArray)

  Store.storiesLength = newsText.stories.length

  return Prompts.news()
}
