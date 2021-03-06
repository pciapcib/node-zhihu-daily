const { prompt } = require('inquirer')

module.exports = () => {
  return prompt([{
    type: 'list',
    name: 'theme',
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
      switch (answer.theme) {
        case 'storyInput':
          Prompts.storyInput()

          break

        case 'back':
          Crawlers.themes()

          break

        case 'backMenu':
          Prompts.menu()
      }
    })
}
