const { prompt } = require('inquirer')

module.exports = () => {
  return prompt([{
    type: 'input',
    name: 'section',
    message: '请输入知乎专栏序号：',
    validate (input) {
      if (/^[0-9]{0,2}$/.test(input)) {
        const testedInput = Number(input)

        if (testedInput >= 1 && testedInput <= Store.sectionsLength) {
          return true
        }
      }

      return `请输入 1 ~ ${Store.sectionsLength} 内的数字`
    }
  }])
    .then(answer => {
      Crawlers.section(answer.section)
    })
}
