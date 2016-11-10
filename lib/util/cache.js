const fs = require('fs')
const path = require('path')

const empty = {
  news: [],
  themes: false,
  sections: false,
  stories: []
}

const isCachedExist = fs.existsSync(path.resolve(__dirname, '../../cached'))
const isCacheDirExist = fs.existsSync(path.resolve(__dirname, '../../cache'))

if (!isCachedExist) {
  fs.writeFileSync(path.resolve(__dirname, '../../cached.json'), JSON.stringify(empty))
}

if (!isCacheDirExist) {
  fs.mkdirSync(path.resolve(__dirname, '../../cache'))
}

const cacheFiles = fs.readdirSync(path.resolve(__dirname, '../../cache'))

exports.watch = () => {
  if (calcCacheSize() > 1024 * 1024 * 2) {
    this.clear(true)
  }
}

exports.show = () => {
  const cacheSize = calcCacheSize()
  let sizeText = ''

  if (cacheSize < 1024) {
    sizeText = `${cacheSize.toFixed(1)}KB`
  } else if (cacheSize >= 1024 && cacheSize <= 1024 * 1024) {
    sizeText = `${(cacheSize / 1024).toFixed(1)}MB`
  } else {
    sizeText = `${(cacheSize / (1024 * 1024)).toFixed(1)}GB`
  }

  return sizeText
}

exports.clear = isWatch => {
  const sizeText = this.show()

  if (cacheFiles.length) {
    fs.writeFileSync(path.resolve(__dirname, '../../cached.json'), JSON.stringify(empty))

    cacheFiles.forEach(file => {
      fs.unlinkSync(path.resolve(__dirname, `../../cache/${file}`))
    })

    if (!isWatch) {
      console.log(`Cleared up ${sizeText} cache files`)
    }
  } else {
    console.log('No cache files')
  }
}

function calcCacheSize () {
  if (cacheFiles.length) {
    return cacheFiles
      .map(file => +fs.statSync(path.resolve(__dirname, `../../cache/${file}`)).size)
      .reduce((x, y) => x + y) / 1024
  }

  return 0
}
