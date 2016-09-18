const superagent = require('superagent')

// module.exports = (url, apiVer = 4) => {
//   return new Promise(resolve => {
//     superagent.get(`http://news-at.zhihu.com/api/${apiVer}/${url}`)
//       .end((err, res) => {
//         if (err) {
//           throw err
//         }

//         resolve(JSON.parse(res.text))
//       })
//   })
// }


class Crawler {
  constructor (url, apiVer = 4) {
    this.url = url
    this.apiVer = apiVer
  }

  fetch () {
    return new Promise(resolve => {
      superagent.get(`http://news-at.zhihu.com/api/${this.apiVer}/${this.url}`)
        .end((err, res) => {
          if (err) {
            throw err
          }

          resolve(JSON.parse(res.text))
        })
    })
  }
}

// new Crawler('news/latest')
//   .fetch()
//   .then(res => {
//     console.log(res)
//   })
module.exports = Crawler
