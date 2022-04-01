const getAllBucketFiles = require('./getAllBucketFiles')
const getUploadFiles = require('./getUploadFiles')
const path = require('path')
const chalk = require('chalk')
const { logInfo, logDanger, logSuccess } = require('./logUtils')
const cliProgress = require('cli-progress')

const b1 = new cliProgress.SingleBar({
  format: chalk.yellowBright('Uploading new files... {bar}') + '| {percentage}% || {value}/{total} Files uploaded',
  barCompleteChar: '\u2588',
  barIncompleteChar: '\u2591',
  hideCursor: true
})


// delete all bucket exits files, then upldoate all static files
const deleteAllThenUploadAll = async (aliOssClient, staticWebAppPath) => {

  logInfo(`Indexing bucket files...`)
  const oldFiles = await getAllBucketFiles(aliOssClient)
  logInfo(`Bucket files indexed`)

  if (oldFiles && oldFiles.length > 0) {
    logDanger(`Deleting bucket files...`)
    await aliOssClient.deleteMulti(oldFiles.map(({ name }) => name), { quiet: true })
    logDanger(`Bucket files deleted`)
  }
  const newFiles = await getUploadFiles(staticWebAppPath)

  b1.start(newFiles.length, 0, {
    speed: "N/A"
  })
  for(let i = 0; i < newFiles.length; i++) {
    const [localPath, remotePath] = newFiles[i]
    await aliOssClient.put(remotePath, path.normalize(localPath))
    b1.update(i + 1)
  }
  b1.stop()
  logSuccess(`\nNew files uploaded`)
}

module.exports = deleteAllThenUploadAll