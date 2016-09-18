const { prompt } = require('inquirer')

module.exports = (backPrompt, choice, choicePrompt) => {
  const choices = [{
    name: '返回上级菜单',
    value: 'back'
  }, {
    name: '返回主菜单',
    value: 'backMenu'
  }]

  if (choice) {
    choices.unshift(choice)
  }

  return prompt([{
    type: 'list',
    name: 'back',
    message: '请选择操作：',
    choices
  }])
    .then(answer => {
      switch (answer.back) {
        case choice.value:
          Crawlers[choicePrompt]()

          break

        case 'back':
          Crawlers[backPrompt]()

          break

        case 'backMenu':
          Prompts.menu()
      }
    })
}
