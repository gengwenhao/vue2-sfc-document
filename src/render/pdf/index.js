const fs = require('fs')

const {
  render: mdRender,
  renderBatch: mdRenderBatch
} = require('../markdown/index')

function render(data, output = 'single.pdf') {
  mdRender(data, 'tmp.md')
}

function renderBatch(data, output = 'all.pdf') {
  mdRenderBatch(data, 'tmp-all.md')
}

module.exports = {
  render,
  renderBatch
}
