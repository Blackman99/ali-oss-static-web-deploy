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


// delete all bucket exits files, then upload all static files
const deleteAllThenUploadAll = async (aliOssClient, staticWebAppPath) => {

  logInfo(`Indexing existing files...`)
  const oldFiles = await getAllBucketFiles(aliOssClient)
  logInfo(`Existing files indexed`)

  const filesToUpload = await getUploadFiles(staticWebAppPath)
  b1.start(filesToUpload.length, 0, {
    speed: "N/A"
  })
  for(let i = 0; i < filesToUpload.length; i++) {
    const [localPath, remotePath] = filesToUpload[i]
    await aliOssClient.put(remotePath, path.normalize(localPath))
    b1.update(i + 1)
  }
  b1.stop()

  
  logInfo(`Comparing existing files and new uploaded files...`)
  const filesToDelete = oldFiles.filter(oldFile => filesToUpload.every(([, targetPath]) => targetPath !== oldFile.name))
  console.log('filesToDelete: ', filesToDelete.length)

  if (filesToDelete && filesToDelete.length > 0) {
    logDanger(`Deleting old files...`)
    await aliOssClient.deleteMulti(filesToDelete.map(({ name }) => name), { quiet: true })
    logDanger(`Old files deleted`)
  }

  logSuccess(`All done.`)
}

module.exports = deleteAllThenUploadAll