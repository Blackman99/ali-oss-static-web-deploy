const chalk = require('chalk')

const logInfo = msg => {
  console.log(chalk.cyan(msg))
}

const logDanger = msg => {
  console.log(chalk.magenta(msg))
}

const logSuccess = msg => {
  console.log(chalk.greenBright(msg))
}
module.exports = {
  logInfo,
  logSuccess,
  logDanger
}