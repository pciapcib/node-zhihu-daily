const cheerio = require('cheerio')
const chalk = require('chalk')

const { logger: { print }, pusher } = require('../util')

module.exports = storyText => {
  const storyArray = []
  const pushStory = pusher(storyArray)

  pushStory()
  pushStory(chalk.bold(storyText.title))

  if (storyText.image) {
    pushStory(`[配图](${storyText.image})`, 2, 1)
    pushStory(`[来源](${storyText.image_source})`)
  }

  if (storyText.type === 0) {
    const $ = cheerio.load(storyText.body)
    const $questiones = $('.question')

    $questiones.each((index, question) => {
      const $question = $(question)

      if (!index) {
        pushStory('---------------------------------------------')
      }

      const title = $question.find('.question-title').text()

      if (title) {
        if (title.includes('广告')) {
          return
        } else {
          pushStory(chalk.bold(title))
        }
      }

      const $answers = $question.find('.answer')
      const $viewMore = $question.find('.view-more a')
      const viewMoreText = $viewMore.text()
      const viewMoreHref = $viewMore.attr('href')

      $answers.each((index, answer) => {
        const $answer = $(answer)
        const $meta = $answer.find('.meta')
        const $content = $answer.find('.content')
        const $paragraphs = $content.find('p')

        const author = $meta.find('.author').text()
        const bio = $meta.find('.bio').text()

        if (author) {
          pushStory(`作者：${chalk.bold(author)}${bio}`)
        }

        if ($paragraphs.length) {
          $paragraphs.each((index, paragraph) => {
            const $paragraph = $(paragraph)

            const paraArray = []
            const pushPara = pusher(paraArray)

            $paragraph.contents().each((index, node) => {
              const $node = $(node)

              if ($node.is('img')) {
                pushPara(`[图片](${$node.attr('src')})`, 0, 0)
              } else if ($node.is('a')) {
                pushPara(`${chalk.underline($node.text())}(${$node.attr('href')})`, 0, 0)
              } else if ($node.is('strong, b')) {
                pushPara(chalk.bold($node.text()), 0, 0)
              } else if ($node.is('br')) {
                pushPara()
              } else {
                pushPara($node.text(), 0, 0)
              }
            })

            pushStory(paraArray.join(''))
          })
        } else {
          const contentArray = []
          const pushContent = pusher(contentArray)

          $content.contents().each((index, node) => {
            const $node = $(node)

            if ($node.is('img')) {
              pushContent()
              pushContent(`[图片](${$node.attr('src')})`, 2, 2)
            } else if ($node.is('a')) {
              pushContent(`${chalk.underline($node.text())}(${$node.attr('href')})`, $node.prev().is('img, br') || !index ? 2 : 0, 0)
            } else if ($node.is('strong, b')) {
              pushContent(chalk.bold($node.text()), $node.prev().is('img, br') || !index ? 2 : 0, 0)
            } else if ($node.is('br')) {
              pushContent()
            } else {
              pushContent($node.text(), $node.prev().is('img, br') || !index ? 2 : 0, 0)
            }
          })

          pushStory(contentArray.join(''), 2, 1)
        }
      })

      if (viewMoreText) {
        pushStory(`${chalk.underline(viewMoreText)}(${viewMoreHref})`, 6)
      }

      pushStory('---------------------------------------------')
    })
  } else {
    pushStory('---------------------------------------------')
    pushStory(`查看原文：${storyText.share_url}`)
    pushStory('---------------------------------------------')
  }

  const { id, section, theme } = storyText

  Store.storyId = id

  if (section) {
    Store.sectionId = section.id

    pushStory(`知乎专栏：${section.name}`, 2, 1)
  } else {
    Store.sectionId = 0
  }

  if (theme) {
    Store.themeId = theme.id

    pushStory(`主题日报：${theme.name}`, 2, 1)
  }

  print(storyArray)

  return Crawlers.extra()
}
