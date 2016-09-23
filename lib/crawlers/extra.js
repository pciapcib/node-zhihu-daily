const Crawler = require('./queen')

module.exports = () => {
  return new Crawler(`story-extra/${Store.storyId}`)
    .fetch()
    .then(res => {
      return Printers.extra(res)
    })
}
