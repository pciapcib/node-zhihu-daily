const { prompt } = require('inquirer')

module.exports = (backPrompt, choices = []) => {
  const baseChoices = [{
    name: '返回上级菜单',
    value: 'back'
  }, {
    name: '返回主菜单',
    value: 'backMenu'
  }]

  let concatedChoices = []

  if (choices.length) {
    concatedChoices = choices.concat(baseChoices)
  } else {
    concatedChoices = baseChoices
  }

  return prompt([{
    type: 'list',
    name: 'back',
    message: '请选择操作：',
    choices: concatedChoices
  }])
    .then(answer => {
      const [chose = {}] = choices.filter(choice => choice.value === answer.back)

      switch (answer.back) {
        case chose.value:
          Crawlers[chose.value]()

          break

        case 'back':
          Crawlers[backPrompt]()

          break

        case 'backMenu':
          Prompts.menu()
      }
    })
}
