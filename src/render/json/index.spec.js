const {parse} = require('../../parser')
const {render, renderBatch} = require('./index')

const data = parse('../../../examples/geng-prop-editor/GengPropEditor.vue')
render(data, 'single.json')
renderBatch([data, data], 'all.json')
