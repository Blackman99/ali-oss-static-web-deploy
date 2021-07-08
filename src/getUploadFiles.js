const fs = require('fs')
// get all the static files in the staticWebAppPath
const getUploadFiles = async(staticWebAppPath) => {
  const files = []
  const readFiles = (basePath, prefix = '') => {
    const paths = fs.readdirSync(basePath)
    const uploadPrefix = prefix === '' ? '' : `${prefix}/`
    paths.forEach(path => {
      const stat = fs.statSync(`${basePath}\\${path}`)
      if (stat.isDirectory()) {
        readFiles(`${basePath}\\${path}`, `${uploadPrefix}${path}`)
        return
      }
      files.push([`${basePath}\\${path}`, `${uploadPrefix}${path}`])
    })
  }
  readFiles(staticWebAppPath)
  return new Promise(resolve => {
    resolve(files)
  })
}

module.exports = getUploadFiles

