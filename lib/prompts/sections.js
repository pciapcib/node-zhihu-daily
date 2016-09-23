const { prompt } = require('inquirer')

module.exports = () => {
  return prompt([{
    type: 'list',
    name: 'sections',
    message: '请选择操作：',
    choices: [{
      name: '查看知乎专栏',
      value: 'section'
    }, {
      name: '返回主菜单',
      value: 'backMenu'
    }]
  }])
    .then(answer => {
      switch (answer.sections) {
        case 'section':
          Prompts.sectionInput()

          break

        case 'backMenu':
          Prompts.menu()
      }
    })
}
