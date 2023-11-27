const {parseSFCFile} = require('./sfc-parser')
const extractOptions = require('./options-extract')

/**
 * 将 VueSFC 文件中的 options 信息提取出来
 * @param sfcFile 文件路径
 * @returns {{methods: [], name: string, description: string, props: []}}
 */
function parse(sfcFile) {
  // 解析 SFC 抽取 script 标签内容
  const {scriptContent} = parseSFCFile(sfcFile)

  // 解析 script 中的 options
  return extractOptions(scriptContent)
}

module.exports = {
  extractOptions,
  parse,
  parseSFCFile
}
