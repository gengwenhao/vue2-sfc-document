/**
 * 获取 ast 节点的注释
 * @param node
 * @returns {*}
 */
function getComment(node) {
  if (node.leadingComments?.length) {
    return node.leadingComments[0].value.trim() || ''
  }

  return ''
}

/**
 * 获取 path 的注释
 * @param path
 * @returns {*}
 */
function getPathComment(path) {
  if (path?.node?.leadingComments?.length) {
    return getComment(path.node)
  }

  return ''
}

module.exports = {
  getComment,
  getPathComment
}
