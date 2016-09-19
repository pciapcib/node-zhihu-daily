const cheerio = require('cheerio')
const chalk = require('chalk')

const { logger: { print }, pusher } = require('../util')

module.exports = (storyText, backPrompt, newsDate) => {
  const storyArray = []
  const pushStory = pusher(storyArray)

  pushStory()
  pushStory(chalk.bold(storyText.title))

  pushStory(`[配图](${storyText.image})`, 2, 1)
  pushStory(`[来源](${storyText.image_source})`, 2)

  const $ = cheerio.load(storyText.body)
  const $questiones = $('.question')

  $questiones.each((index, question) => {
    const $question = $(question)

    const title = $question.find('.question-title').text()

    if (title) {
      if (title.includes('广告')) {
        return
      } else {
        pushStory(`问题：${title}`)
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

      $paragraphs.each((index, paragraph) => {
        const $paragraph = $(paragraph)
        const $img = $paragraph.find('img')

        if ($img.length) {
          pushStory(`[图片](${$img.attr('src')})`, 4)
        } else {
          const paraArray = []
          const pushPara = pusher(paraArray)

          $paragraph.contents().each((index, node) => {
            const $node = $(node)

            if ($node.is('a')) {
              pushPara(`${chalk.underline($node.text())}(${$node.attr('href')})`, 0, 0)
            } else if ($node.is('strong')) {
              pushPara(chalk.bold($node.text()), 0, 0)
            } else {
              if (!$node.is('br')) {
                if ($node.prev().is('strong, a, img')) {
                  pushPara($node.text(), 0, 0)
                } else if ($node.next().is('br') || $node.prev().is('br')) {
                  pushPara($node.text(), index ? 4 : 0, 0)
                } else {
                  pushPara($node.text(), 0, 0)
                }
              } else {
                pushPara()
              }
            }
          })

          pushStory(paraArray.join(''), 4)
        }
      })
    })

    if (viewMoreText) {
      pushStory(`${chalk.underline(viewMoreText)}(${viewMoreHref})`, 4)
    }
    pushStory()
  })

  print(storyArray)

  Prompts.back(backPrompt, [{
    name: '查看评论',
    value: 'comment'
  }, {
    name: '查看专栏',
    value: 'section'
  }], newsDate)
}
