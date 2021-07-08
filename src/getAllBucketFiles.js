// get all existing files in an oss bucket
const getAllBucketFiles = async (aliOssClient) => {
  const allFiles = []
  let marker = null
  do {
    const res = await aliOssClient.list({
      marker
    })
    marker = res.nextMarker
    if (res.objects) {
      allFiles.push(...res.objects)
    }
  } while (marker)
  return new Promise(resolve => {
    resolve(allFiles)
  })
}

module.exports = getAllBucketFiles