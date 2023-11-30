# vue2-sfc-document

Parsing Vue2 SFC automatically generates documents and supports multiple document formats, including Markdown, Docx,
PDf, HTML, and more.

解析 Vue2 SFC 自动生成文档，支持多种文档格式，包括 Markdown、Docx、PDF、HTML 等等。

[![npm](https://img.shields.io/npm/v/vue2-sfc-document.svg)](https://www.npmjs.com/package/vue2-sfc-document)

---

## QuickStart 快速开始

### Install tools.

安装工具

```shell
npm install -g vue2-sfc-document
```

### Scan all sfc components.

扫描所有组件

```shell
sfcdoc scan . --output ./docs
```

### Or specify an SFC component.

或者干脆指定某个 Vue 组件

```shell
sfcdoc scan HelloPanel.vue --output ./docs
```

---

## CLI 常用命令

> To view more CLI commands, run sfcdoc --help on the terminal. 更多的 CLI 命令可以在终端输入 sfcdoc --help 查看

### Document Type

文档格式

```shell
# You can specify the format of the generated file.
# 指定文档格式
sfcdoc scan HelloPanel.vue --output ./docs --types 'md,pdf,json,docx,html'
```

### Document file name

文档名称

```shell
# When scanning only one Vue component, you can specify the name of the generated document, but the suffix is ignored.
# 只扫描一个 Vue 组件时，可以指定生成的文档名称，不过后缀名会被忽略
sfcdoc scan HelloPanel.vue --output ./docs --file hello-panel --types md pdf json docx html
```

### Multiple documents

生成多文档

```shell
# If the --multiple, -M argument is added, multiple copies of the document will be generated.
# 如果补充 --multiple 或 -M 参数，文档会被生成多份
sfcdoc scan ./projectName --multiple --output ./docs --types pdf
```








