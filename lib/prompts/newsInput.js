const { prompt } = require('inquirer')

const { rmDateLine } = require('../util/filter')

module.exports = () => {
  return prompt([{
    type: 'input',
    name: 'newsDate',
    message: '请输入日期：',
    validate (input) {
      if (/^20[0-9]{0,2}-[0-1][0-9]-[0-3][0-9]$/.test(input)) {
        const date = Number(rmDateLine(input))

        if (date <= 20130519) {
          return '日期不能早于知乎日报的生日 2013-05-19'
        } else {
          return true
        }
      }

      return `请输入正确的日期格式，如 2015-12-25`
    }
  }])
    .then(answer => {
      const newsDate = compareDate(rmDateLine(answer.newsDate))

      Crawlers.news(newsDate)
    })
}

function compareDate (newsDate) {
  const date = new Date()
  const dateArray = [date.getFullYear(), date.getMonth() + 1,
      date.getDate()]

  let today = ''

  dateArray.forEach(time => {
    today += time < 10 ? `0${time}` : time
  })

  today = Number(today)

  if (newsDate > today) {
    return String(today)
  } else {
    return newsDate
  }
}
