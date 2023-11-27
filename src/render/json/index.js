const fs = require('fs')

function render(data, output = 'result.json') {
  fs.writeFileSync(output, JSON.stringify(data), {flag: 'w'})
}

module.exports = {
  render,
  renderBatch: render
}
