const { prompt } = require('inquirer')

module.exports = backPrompt => {
  return prompt([{
    type: 'input',
    name: 'story',
    message: '请输入新闻序号：',
    validate (input) {
      if (/^[0-9]{0,2}$/.test(input)) {
        const testedInput = Number(input)

        if (testedInput >= 1 && testedInput <= Store.storiesLength) {
          return true
        }
      }

      return `请输入 1 ~ ${Store.storiesLength} 内的数字`
    }
  }])
    .then(answer => {
      Crawlers.story(answer.story, backPrompt)
    })
}
