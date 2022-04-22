const getAllBucketFiles = require('./getAllBucketFiles')
const getUploadFiles = require('./getUploadFiles')
const path = require('path')
const chalk = require('chalk')
const { logInfo, logDanger } = require('./logUtils')

// delete all bucket exits files, then upload all static files
const deleteAllThenUploadAll = async (aliOssClient, staticWebAppPath) => {

  logInfo(`Indexing existing files...`)
  const oldFiles = await getAllBucketFiles(aliOssClient)
  logInfo(`Existing files indexed`)

  const filesToUpload = await getUploadFiles(staticWebAppPath)

  logInfo(`Uploading new files...`)
  for(let i = 0; i < filesToUpload.length; i++) {
    const [localPath, remotePath] = filesToUpload[i]
    process.stdout.write("\r\x1b[K")
    process.stdout.write(`${chalk.yellow('Uploading local file: ')}${localPath} ${chalk.yellow('To Ali OSS: ')}${remotePath}\x1b[K`)
    await aliOssClient.put(remotePath, path.normalize(localPath))
  }
  logInfo(`\nNew files uploaded`)
  
  
  const newFiles = await getAllBucketFiles(aliOssClient)
  logInfo(`Comparing existing files and new uploaded files...`)
  const filesToDelete = oldFiles.filter(oldFile => !newFiles.some(newFile => newFile.name === oldFile.name))
  console.log('filesToDelete: ', filesToDelete)
  if (filesToDelete && filesToDelete.length > 0) {
    logDanger(`Deleting old files...`)
    await aliOssClient.deleteMulti(filesToDelete.map(({ name }) => name), { quiet: true })
    logDanger(`Old files deleted`)
  }

  logInfo(`All done.`)
}

module.exports = deleteAllThenUploadAll