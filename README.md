# vue2-sfc-document

> Parsing Vue2 SFC automatically generates documents and supports multiple document formats, including Markdown, Dox,
> Pdf,
> HTML, and more.

> 解析 Vue2 SFC 自动生成文档，支持多种文档格式，包括 Markdown、Dox、Pdf、HTML 等等。

## QuickStart 快速开始

Install tools.
> 安装工具

```shell
npm install -g vue2-sfc-document
```

Scan all sfc components.
> 扫描项目所有组件

```shell
sfcdoc scan . --output ./docs
```

The SFC generation document is specified.
> 将指定 SFC 生成文档

```shell
sfcdoc scan HelloPanel.vue --output ./docs
```

You can specify the format of the generated file.
> 指定具体格式生成文档

```shell
sfcdoc scan HelloPanel.vue -O ./docs --types md pdf docx html
```





