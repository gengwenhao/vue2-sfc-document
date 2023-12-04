import {defineConfig} from 'dumi'

const logo = 'https://static.yangzw.vip/doc/logo.png'

export default defineConfig({
  favicon: logo,
  logo,
  mode: 'site',
  title: 'Vue SFC Document',
  navs: [
    {path: '/api', title: 'API'},
  ]
})
