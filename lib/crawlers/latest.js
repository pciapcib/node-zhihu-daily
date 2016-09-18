const Crawler = require('./queen')
const { filter: { date }, logger: { log }, pusher } = require('../util')

module.exports = () => {
  return new Crawler('news/latest')
    .fetch()
    .then(res => {
      const latestArray = []
      const pushLatest = pusher(latestArray)

      pushLatest()
      pushLatest(`知乎日报  ${date(res.date)}`)

      res.stories.forEach((story, index) => {
        index++

        pushLatest(`${index < 10 ? ' ' : ''}${index}. ${story.title}`, 2, 1)
      })

      log(latestArray)

      Prompts.latest(res.stories.length)
    })
}
