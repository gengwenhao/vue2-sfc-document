const fs = require('fs')

const Handlebars = require("handlebars")

const templateRaw = fs.readFileSync('./template.md').toString()
const template = Handlebars.compile(templateRaw)

const testData = {
  description: '文本包装组件，双击文本后生成可输入的控件',
  name: 'GengPropEditor',
  props: [
    {
      propName: 'isEditing',
      description: '编辑状态',
      childProps: [Object],
      raw: 'isEditing: {\n  type: Boolean,\n  default: false\n}'
    },
    {
      propName: 'inputVal',
      description: '输入值',
      childProps: [Object],
      raw: "inputVal: {\n  type: String,\n  default: ''\n}"
    }
  ],
  methods: [
    {
      methodName: 'handleUpdateVal',
      description: '更新值',
      params: [Array],
      raw: 'handleUpdateVal(val)'
    },
    {
      methodName: 'handleDBClick',
      description: '双击事件',
      params: [],
      raw: 'handleDBClick()'
    }
  ]
}

function render(data, output = 'result.md') {
  const s = template(testData)
  fs.writeFileSync(output, s, {flag: 'w'})
}

render(testData)

