const Crawler = require('./queen')

module.exports = () => {
  return new Crawler(`story/${Store.storyId}/short-comments`)
    .fetch()
    .then(res => {
      Printers.comments(res)
    })
}
