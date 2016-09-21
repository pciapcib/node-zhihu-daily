const { prompt } = require('inquirer')

const { rmDateLine } = require('../util/filter')

module.exports = () => {
  return prompt([{
    type: 'input',
    name: 'newsDate',
    message: '请输入日期：',
    validate (input) {
      if (/^20[0-9]{0,2}-[0-1][0-9]-[0-3][0-9]$/.test(input)) {
        const date = rmDateLine(input)

        return date <= 20130519 ? '日期不能早于知乎日报的生日 2013-05-19' : true
      }

      return `请输入正确的日期格式，如 2015-12-25`
    }
  }])
    .then(answer => {
      Store.newsDate = rmDateLine(compareDate(answer.newsDate))

      Crawlers.news()
    })
}

function compareDate (newsDate) {
  const today = new Date().getTime()
  const inputDate = Date.parse(newsDate)

  return new Date(inputDate > today ? today : inputDate).toLocaleDateString()
}
