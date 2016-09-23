const { prompt } = require('inquirer')

module.exports = () => {
  return prompt([{
    type: 'list',
    name: 'comments',
    message: '请选择操作：',
    choices: [{
      name: '返回上级菜单',
      value: 'back'
    }, {
      name: '返回主菜单',
      value: 'backMenu'
    }]
  }])
    .then(answer => {
      switch (answer.comments) {
        case 'back':
          Crawlers.story()

          break

        case 'backMenu':
          Prompts.menu()
      }
    })
}
