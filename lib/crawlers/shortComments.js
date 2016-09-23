const Crawler = require('./queen')

module.exports = () => {
  return new Crawler(`story/${Store.storyId}/short-comments`)
    .fetch()
    .then(res => {
      return Printers.comments(res)
    })
}
