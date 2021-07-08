const getAllBucketFiles = require('./getAllBucketFiles')
const getUploadFiles = require('./getUploadFiles')
const path = require('path')
const chalk = require('chalk')
const { logInfo, logDanger } = require('./logUtils')

// delete all bucket exits files, then upldoate all static files
const deleteAllThenUploadAll = async (aliOssClient, staticWebAppPath) => {

  logInfo(`Indexing bucket files...`)
  const oldFiles = await getAllBucketFiles(aliOssClient)
  logInfo(`Index bucket files done`)

  if (oldFiles && oldFiles.length > 0) {
    logDanger(`Deleting bucket files...`)
    await aliOssClient.deleteMulti(oldFiles.map(({ name }) => name), { quiet: true })
    logDanger(`Delete bucket files done`)
  }
  const newFiles = await getUploadFiles(staticWebAppPath)

  logInfo(`Uploading new files...`)
  for(let i = 0; i < newFiles.length; i++) {
    const [localPath, remotePath] = newFiles[i]
    process.stdout.write("\r\x1b[K")
    process.stdout.write(`${chalk.yellow('Uploading local file: ')}${localPath} ${chalk.yellow('To Ali OSS: ')}${remotePath}\x1b[K`)
    await aliOssClient.put(remotePath, path.normalize(localPath))
  }
  logInfo(`\nUpload new files done`)
}

module.exports = deleteAllThenUploadAll