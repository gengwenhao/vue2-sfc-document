const fs = require('fs')

const Handlebars = require("handlebars")

const template = Handlebars.compile(`## {{name}}

> {{description}}

### 属性

{{#each props}}

#### {{propName}}

> {{description}}

\`\`\`shell
{{{raw}}}
\`\`\`

{{/each}}

### 函数

{{#each methods}}

#### {{raw}} 

> {{description}} 

{{/each}}

`)

function render(data, output = 'result.md', flag = 'w') {
  fs.writeFileSync(output, template(data), {flag})
}

function renderBatch(arr, output = 'result.md') {
  arr.forEach(data => {
    render(data, output, 'a')
  })
}

module.exports = {
  render,
  renderBatch
}
