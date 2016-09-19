const { prompt } = require('inquirer')

module.exports = storiesLength => {
  return prompt([{
    type: 'input',
    name: 'story',
    message: '请输入新闻编号：',
    validate (input) {
      if (/^[0-9]{0,2}$/.test(input)) {
        const testedInput = Number(input)

        if (testedInput >= 1 && testedInput <= storiesLength) {
          return true
        }
      }

      return `请输入 1 ~ ${storiesLength} 内的数字`
    }
  }])
    .then(answer => {
      Crawlers.story(answer.story)
    })
}
