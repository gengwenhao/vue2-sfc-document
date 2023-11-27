const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default

const handlers = require('./handlers')
const {getPathComment} = require('./utils')

const OPTIONS_PROPS = [
  'name',
  'props',
  'methods',
]

function extractOptions(code) {
  // 将 <script></script> 代码转换成 ast
  const ast = parser.parse(code, {
    sourceType: 'unambiguous'
  })

  // 要返回的数据结果
  const res = {
    'description': '',
    'name': '',
    'props': [],
    'methods': []
  }

  // 基于 @babel/traverse transform AST
  traverse(ast, {
    // 解析 export default {} 前面注释
    ExportDefaultDeclaration(path, state) {
      res.description = getPathComment(path) || 'unknown'
    },

    // 解析 options 的属性
    ObjectProperty(path, state) {
      const propertyName = path.node.key.name || 'unknown'
      if (OPTIONS_PROPS.includes(propertyName)) {
        handlers[`${propertyName}Handler`](path, res)
      }
    }
  })

  return res
}

module.exports = extractOptions
