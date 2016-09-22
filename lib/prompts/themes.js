const { prompt } = require('inquirer')

module.exports = () => {
  return prompt([{
    type: 'list',
    name: 'themes',
    message: '请选择操作：',
    choices: [{
      name: '查看主题日报',
      value: 'theme'
    }, {
      name: '返回主菜单',
      value: 'backMenu'
    }]
  }])
    .then(answer => {
      switch (answer.themes) {
        case 'theme':
          Prompts.themeInput()

          break

        case 'backMenu':
          Prompts.menu()
      }
    })
}
