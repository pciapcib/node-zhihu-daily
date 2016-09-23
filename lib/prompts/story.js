const { prompt } = require('inquirer')

module.exports = extra => {
  const baseChoices = [{
    name: '返回上级菜单',
    value: 'back'
  }, {
    name: '返回主菜单',
    value: 'backMenu'
  }]
  const storyChioces = []

  if (extra.long_comments) {
    storyChioces.push({
      name: '查看长评论',
      value: 'longComments'
    })
  }

  if (extra.short_comments) {
    storyChioces.push({
      name: '查看短评论',
      value: 'shortComments'
    })
  }

  if (Store.from !== 'section' && Store.sectionId) {
    storyChioces.push({
      name: '查看知乎专栏',
      value: 'section'
    })
  }

  return prompt([{
    type: 'list',
    name: 'story',
    message: '请选择操作：',
    choices: storyChioces.concat(baseChoices)
  }])
    .then(answer => {
      switch (answer.story) {
        case 'longComments':
          Crawlers.longComments()

          break

        case 'shortComments':
          Crawlers.shortComments()

          break

        case 'section':
          Crawlers.section()

          break

        case 'back':
          Crawlers[Store.from]()

          break

        case 'backMenu':
          Prompts.menu()
      }
    })
}
