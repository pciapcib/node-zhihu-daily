module.exports = extra => {
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

  if (Store.sectionId) {
    storyChioces.push({
      name: '查看知乎专栏',
      value: 'section'
    })
  }

  return Prompts.back(storyChioces)
}
