const fs = require('fs')

const babel = require('@babel/core')
const consoleParameterPlugin = require('../plugins/console-parameter-plugin.cjs')
const {babelParse, parse} = require('@vue/compiler-sfc')

const {
  template: {content: templateContent},
  script: {content: scriptContent}
} = parse(fs.readFileSync('./GengPropEditor.vue').toString()).descriptor

// 借助 @babel/core 的 API 可以直接调用写好的插件
babel.transformSync(scriptContent, {
  plugins: [consoleParameterPlugin],
  parserOpts: {
    sourceType: 'unambiguous',
    plugins: ['jsx']
  }
})

console.log(globalThis.results)
