const {parse} = require('../../parser')
const {renderBatch, render} = require('./index')

const data = parse('../../../examples/geng-prop-editor/GengPropEditor.vue')

render(data, 'single.md')
renderBatch([data, data], 'all.md')
