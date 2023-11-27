const fs = require('fs')

const {babelParse, parse} = require('@vue/compiler-sfc')

/**
 * 解析 VueSFC 文件
 * @param filePath VueSFC 文件路径
 * @returns {{scriptContent: string, templateContent: string}}
 */
function parseSFCFile(filePath) {
  if (!fs.existsSync(filePath)) {
    throw Error('file not found')
  }

  return parseSFCCode(fs.readFileSync(filePath).toString())
}

/**
 * 解析 VueSFC 内容
 * @param code VueSFC 内容
 * @returns {{scriptContent: string, templateContent: string}}
 */
function parseSFCCode(code) {
  const {
    template: {content: templateContent},
    script: {content: scriptContent}
  } = parse(code).descriptor

  return {
    templateContent,
    scriptContent
  }
}

module.exports = {
  parseSFCFile,
  parseSFCCode
}
