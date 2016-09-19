const { prompt } = require('inquirer')

module.exports = () => {
  return prompt([{
    type: 'list',
    name: 'menu',
    message: '请选择操作：',
    choices: [{
      name: '查看今日新闻',
      value: 'latest'
    }, {
      name: '查看往日新闻',
      value: 'news'
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

        case 'news':
          Prompts.newsInput()

          break

        case 'exit':
          process.exit()
      }
    })
}
