const { prompt } = require('inquirer')

module.exports = () => {
  return prompt([{
    type: 'input',
    name: 'theme',
    message: '请输入主题日报序号：',
    validate (input) {
      if (/^[0-9]{0,2}$/.test(input)) {
        const testedInput = Number(input)

        if (testedInput >= 1 && testedInput <= Store.themesLength) {
          return true
        }
      }

      return `请输入 1 ~ ${Store.themesLength} 内的数字`
    }
  }])
    .then(answer => {
      Crawlers.theme(answer.theme)
    })
}
