const OSS = require('ali-oss')
const deleteAllThenUploadAll = require('./src/deleteAllThenUploadAll')

module.exports = ({
  region,
  accessKeyId,
  accessKeySecret,
  bucket,
  staticWebAppPath
}) => {
  const aliOssClient = new OSS({
    region,
    accessKeyId,
    accessKeySecret,
    bucket
  })
  deleteAllThenUploadAll(aliOssClient, staticWebAppPath)
}