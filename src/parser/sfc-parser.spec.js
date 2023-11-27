const {parseSFCFile} = require('./sfc-parser.js')

const path = '../../examples/geng-prop-editor/GengPropEditor.vue'

const scriptContent = `// 文本包装组件，双击文本后生成可输入的控件
export default {
  name: "GengPropEditor",

  props: {
    // 编辑状态
    isEditing: {
      type: Boolean,
      default: false
    },
    // 输入值
    inputVal: {
      type: String,
      default: ''
    }
  },

  methods: {
    // 更新值
    handleUpdateVal(val) {
      this.$emit('update:inputVal', val)
    },

    // 双击事件
    handleDBClick() {
      this.$emit('update:isEditing', true)
      this.$emit('onEditing')
    }
  }
}`

test('scf parser script tag', () => {
  expect(parseSFCFile(path).scriptContent.trim()).toBe(scriptContent)
})
