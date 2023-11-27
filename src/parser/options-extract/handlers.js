const generate = require('@babel/generator').default

const {getComment} = require('./utils')

/**
 * 处理 options 中的 name 字段
 * @param path
 * @param results
 */
function nameHandler(path, results) {
  results.name = path?.node?.value?.value || ''
}

/**
 * 处理 options 中的 prop 字段
 * @param path
 * @param results
 */
function propsHandler(path, results) {
  const propList = path?.node?.value?.properties || []
  propList.forEach(prop => {
    const propName = prop?.key?.name || 'unknown'
    const childStr = generate(prop.value, {comments: false}).code
    const childNormalizeStr = childStr
      .replace('\{\n ', '\{\"')
      .replaceAll(': ', '\":\"')
      .replaceAll('\,\n  ', '\",\"')
      .replace('\n\}', '\"\}')
    const childProps = JSON.parse(childNormalizeStr)

    // trim child values
    Object.entries(childProps)
          .forEach(([k, v]) => {
            delete childProps[k]
            childProps[k.trim()] = v.trim()
          })

    results.props.push({
      propName,
      description: getComment(prop),
      childProps,
      raw: generate(prop, {comments: false}).code || ''
    })
  })
}

/**
 * 处理 options 中的 methods 字段
 * @param path
 * @param results
 */
function methodsHandler(path, results) {
  const methodsList = path?.node?.value?.properties || []
  methodsList.forEach(method => {
    const methodName = method?.key?.name
    const params = method.params.map(param => param.name)

    results.methods.push({
      methodName,
      description: getComment(method),
      params,
      raw: `${methodName}(${params.join(' ')})`
    })
  })
}

module.exports = {
  nameHandler,
  propsHandler,
  methodsHandler
}
