const superagent = require('superagent')

const { error } = require('../util/logger')

class Crawler {
  constructor (url, apiVer = 4) {
    this.url = url
    this.apiVer = apiVer
  }

  fetch () {
    return new Promise(resolve => {
      superagent.get(`http://news-at.zhihu.com/api/${this.apiVer}/${this.url}`)
        .end((err, res) => {
          if (err) error(err)

          resolve(JSON.parse(res.text))
        })
    })
  }
}

module.exports = Crawler
