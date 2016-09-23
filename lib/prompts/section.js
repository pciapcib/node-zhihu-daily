const { prompt } = require('inquirer')

module.exports = () => {
  return prompt([{
    type: 'list',
    name: 'section',
    message: '请选择操作：',
    choices: [{
      name: '阅读新闻',
      value: 'storyInput'
    }, {
      name: '返回上级菜单',
      value: 'back'
    }, {
      name: '返回主菜单',
      value: 'backMenu'
    }]
  }])
    .then(answer => {
      switch (answer.section) {
        case 'storyInput':
          Prompts.storyInput()

          break

        case 'back':
          Crawlers.sections()

          break

        case 'backMenu':
          Prompts.menu()
      }
    })
}
