const { prompt } = require('inquirer')

module.exports = () => {
  return prompt([{
    type: 'list',
    name: 'news',
    message: '请选择操作：',
    choices: [{
      name: '阅读新闻',
      value: 'story'
    }, {
      name: '返回主菜单',
      value: 'backMenu'
    }]
  }])
    .then(answer => {
      switch (answer.news) {
        case 'story':
          Prompts.storyInput()

          break

        case 'backMenu':
          Prompts.menu()
      }
    })
}
