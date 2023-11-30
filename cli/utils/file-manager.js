const path = require('path')
const fs = require('fs')


class FileManager {
  fileList = []

  constructor(filePath) {
    if (typeof filePath !== 'string') {
      throw TypeError('path must be string')
    }

    if (FileManager.exists(filePath)) {
      // 得到绝对路径
      filePath = path.resolve(filePath)

      // 建立文件路径列表
      this.fileList = (FileManager.isDir(filePath))
        ? FileManager.getDirFileList(filePath)
        : [filePath]
    }
  }

  static isDir(filePath) {
    try {
      this.stat = fs.lstatSync(filePath)
    } catch (err) {
      return false
    }

    return this.stat.isDirectory()
  }

  static exists(filePath) {
    try {
      this.stat = fs.lstatSync(filePath)
    } catch (err) {
      return false
    }

    return true
  }

  /**
   * 获取目录中的所有文件路径
   * @param dirPath
   */
  static getDirFileList(dirPath) {
    let fileList = []

    const entries = fs.readdirSync(dirPath, {withFileTypes: true})
    for (const entry of entries) {
      const filePath = path.join(dirPath, entry.name)
      if (entry.isFile()) {
        fileList.push(filePath)
      } else if (entry.isDirectory()) {
        const subDirFiles = this.getDirFileList(filePath)
        fileList = fileList.concat(subDirFiles)
      }
    }

    return fileList
  }

  static getFileExtension(filename) {
    const matches = /(?:\.([^.]+))?$/.exec(filename)
    return matches ? matches[1] : ''
  }

  static getFileName(filePath) {
    const matches = /^(.*?)(\.[^.]+)?$/.exec(filePath)
    return matches ? matches[1] : ''
  }
}

module.exports = FileManager
