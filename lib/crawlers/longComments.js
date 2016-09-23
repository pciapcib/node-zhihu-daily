const Crawler = require('./queen')

module.exports = () => {
  return new Crawler(`story/${Store.storyId}/long-comments`)
    .fetch()
    .then(res => {
      return Printers.comments(res)
    })
}
