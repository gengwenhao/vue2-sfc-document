const fs = require('fs')
const path = require('path')

const FileManager = require('../../utils/file-manager')
const {parser, render} = require('../../../src')

const optionItemsHandler = (items) => {
  return items
    .split(',')
    .map(v => v.trim())
    .filter(v => v)
}

// 文档类型名和生成器名的映射
const RENDER_NAME_MAP = {
  // 'docx': 'docx',
  // 'html': 'html',
  // 'image': 'image',
  'json': 'json',
  'md': 'markdown',
  // 'pdf': 'pdf'
}

/**
 *  scan 命令
 */
function scanHandler(program) {
  program
    .command('scan <filePath>')
    .description('解析 Vue2 SFC 自动生成文档')
    .option('-f, --file <string>', '输出文档名称', '')
    .option('-o, --output <string>', '输出目录', './')
    .option('-t, --types <items>', '输出文档类型 docx,html,image,json,md,pdf', optionItemsHandler)
    .option('-m, --multiple', '输出多个文档', false)
    .action((filePath, {file, output, types, multiple}) => {

      // 创建文档输出目录
      if (!fs.existsSync(output)) {
        fs.mkdirSync(output)
      }

      // 扫描 sfc 组件路径
      const vueSFCList = new FileManager(filePath)
        .fileList
        .filter(item => item.toLowerCase().endsWith('.vue'))

      // 过滤无效的文档格式
      const renderNames = (types || ['md'])
        .map(t => [RENDER_NAME_MAP[t], t])
        .filter(([renderName, typeName]) => renderName && typeName)

      // 生成文档
      renderNames.forEach(([renderName, typeName]) => {
        // 生成多个文档
        if (multiple) {
          vueSFCList.forEach(sfc => {
            // 生成每个文档的文件路径
            const fileName = file
              ? `${file}.${typeName}`
              : `${path.basename(sfc)}.${typeName}`
            const outputPath = path.join(output, fileName)

            // 解析 sfc 的 ast
            const ast = parser.parse(sfc)
            render[renderName].render(ast, outputPath)

            console.log(outputPath)
          })
        }
        // 生成一个文档
        else {
          // 生成文档的文件路径
          const fileName = file
            ? `${file}.${typeName}`
            : `result.${typeName}`
          const outputPath = path.join(output, fileName)

          // 解析 sfc 整合 ast
          const data = vueSFCList.map(sfc => parser.parse(sfc))
          render[renderName].renderBatch(data, outputPath)

          console.log(outputPath)
        }
      })

    })
}

module.exports = scanHandler
