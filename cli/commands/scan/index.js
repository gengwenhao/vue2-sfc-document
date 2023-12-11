const fs = require('fs')
const path = require('path')

const chalk = require('chalk')

const FileManager = require('../../utils/file-manager')
const {parser, render} = require('../../../src')

const optionItemsHandler = (items) => {
  return items
    .split(',')
    .map(v => v.trim())
    .filter(v => v)
}

// “文档类型名” 和 “渲染函数名” 的映射
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
    .command('scan <file_path>')
    .description('解析 Vue2 SFC 自动生成文档')
    .option('-f, --file <string>', '输出文档名称', '')
    .option('-o, --output <string>', '输出目录', 'docs')
    .option('-t, --types <items>', '输出文档类型 docx,html,image,json,md,pdf', optionItemsHandler)
    .option('-m, --multiple', '输出多个文档', false)
    .action(async (filePath, {file, output, types, multiple}) => {

      // 处理路径为绝对路径
      filePath = path.resolve(filePath)
      output = path.resolve(output)

      // 创建输出目录
      if (!fs.existsSync(output)) {
        fs.mkdirSync(output)
        console.log(chalk.red(`创建目录：${output}`))
      } else {
        console.log(chalk.green(`输出目录：${output}`))
      }

      // 导入 ora，用于在控制台提示进度条
      const {default: ora} = await import('ora')
      const spinner = ora(`扫描：${filePath}\n`).start()

      // 扫描 sfc 组件路径
      const vueSFCList = new FileManager(filePath)
        .fileList
        .filter(item => item.toLowerCase().endsWith('.vue'))

      // 过滤无效的文档格式
      const renderFuncNames = (types || ['md'])
        .map(t => [RENDER_NAME_MAP[t], t])
        .filter(([renderName, typeName]) => renderName && typeName)

      // 生成文档
      const outputPaths = []
      renderFuncNames.forEach(([renderName, typeName]) => {
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

            outputPaths.push(outputPath)
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

          outputPaths.push(outputPath)
        }
      })

      setTimeout(() => {
        spinner.succeed('完成')
        console.log(chalk.green(outputPaths.join('\n')))
      }, 4000)

    })
}

module.exports = scanHandler
