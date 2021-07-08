
A tool to help you deploy static web application with ali oss

## Install

* with npm
```sh
npm install --save ali-oss-static-web-deploy
```
* with yarn

```sh
yarn add ali-oss-static-web-deploy
```


## Usage

```js
const aliOSSStaicWebDeploy = require('ali-oss-static-web-deploy')
aliOSSStaicWebDeploy({
  region: 'Your region',
  accessKeyId: 'Your access key',
  accessKeySecret: 'Your access key secret',
  bucket: 'Your bucket name',
  staticWebAppPath: 'Your path to deploy', // for example: require('path').resolve(__dirname, 'dist')
})
```

the tool will delete all files in the bucket then upload all files in `staticWebAppPath`

for more ali oss details see [Ali OSS official documentation](https://help.aliyun.com/product/31815.html)