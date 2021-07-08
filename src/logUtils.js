const chalk = require('chalk')

const logInfo = msg => {
  console.log(chalk.cyan(msg))
}

const logDanger = msg => {
  console.log(chalk.magenta(msg))
}

module.exports = {
  logInfo,
  logDanger
}