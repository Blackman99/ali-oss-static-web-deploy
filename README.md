
## Introduction

A tool to help you deploy static web application with ali oss

## Features

* Keep your Ali OSS bucket mantain the minimal occupation
* Deploy OSS static site in a simple way

## Install

* via npm
```sh
npm install --save ali-oss-static-web-deploy
```
* via yarn

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
  // for example: require('path').resolve(process.cwd(), 'dist')
  staticWebAppPath: 'Your local path to deploy'
})
```

If you don't know how to get the `accessKeyId` and `accessKeySecret`.

Please read the [Ali RAM Documnetation](https://help.aliyun.com/product/28625.html)

**This tool will delete all files in the bucket then upload all files in `staticWebAppPath`!**

**Please be clearly understanding the consequences!**

## References

* [Ali OSS Node SDK](https://github.com/ali-sdk/ali-oss)
* [Ali OSS official documentation](https://help.aliyun.com/product/31815.html)
* [Ali RAM Documnetation](https://help.aliyun.com/product/28625.html)

## License

[MIT](https://opensource.org/licenses/MIT)
