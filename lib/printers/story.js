const cheerio = require('cheerio')
const chalk = require('chalk')

const { logger: { print }, pusher } = require('../util')

module.exports = storyText => {
  const storyArray = []
  const pushStory = pusher(storyArray)

  pushStory()
  pushStory(chalk.bold(storyText.title))

  pushStory(`[配图](${storyText.image})`, 2, 1)
  pushStory(`[来源](${storyText.image_source})`)

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

      $paragraphs.each((index, paragraph) => {
        const $paragraph = $(paragraph)
        const $img = $paragraph.find('img')

        if ($img.length) {
          pushStory(`[图片](${$img.attr('src')})`)
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
                  pushPara($node.text(), index ? 2 : 0, 0)
                } else {
                  pushPara($node.text(), 0, 0)
                }
              } else {
                pushPara()
              }
            }
          })

          pushStory(paraArray.join(''))
        }
      })
    })

    if (viewMoreText) {
      pushStory(`${chalk.underline(viewMoreText)}(${viewMoreHref})`, 6)
    }

    pushStory('---------------------------------------------')
  })

  print(storyArray)

  const { id, section } = storyText

  Store.storyId = id
  Store.SectionId = section ? section.id : 0

  Crawlers.extra()
}
