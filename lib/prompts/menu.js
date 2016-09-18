const { prompt } = require('inquirer')

module.exports = () => {
  return prompt([{
    type: 'list',
    name: 'menu',
    message: '请选择操作：',
    choices: [{
      name: '查看最新消息',
      value: 'latest'
    }, {
      name: '退出',
      value: 'exit'
    }]
  }])
    .then(answer => {
      switch (answer.menu) {
        case 'latest':
          Crawlers.latest()

          break

        case 'exit':
          process.exit()
      }
    })
}
