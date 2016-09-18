const chalk = require('chalk')

exports.print = msgArr => {
  console.log(msgArr.join(''))
}

exports.error = err => {
  console.error(chalk.red(`  Error: ${err}`))

  process.exit(1)
}
