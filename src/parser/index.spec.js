const parser = require('./index')

const path = '../../examples/geng-prop-editor/GengPropEditor.vue'

test('test parser.parse', () => {
  expect(parser.parse(path)).toEqual({
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
  )
})
