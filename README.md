# Vue框架开发通用模板

## 使用
### 开发
```
yarn dev
或者
npm run dev
```

### 构建
```
yarn build
或者
npm run build
```

### 代码检查
```
yarn lint
或者
npm run lint
```

## 结构
查看 [结构.txt](结构.txt) 文件


## ESlint
如果出现烦人的报错提示, 请修改package.json文件下的eslintConfig项中的rules来关闭

### 当前规则
- 无分号
- 单引号
- 缩进使用2个空格
- ...

## 兼容
配置请修改 package.json 文件下的 browserslist选项

## UI库
- [iview](https://www.iviewui.com/docs/guide/install)
- 如果要使用其他UI库

> 命令行删除iview

```
yarn remove iview
或者
npm uninstall iview
```

> 删除以下代码

``` js
// src/components/index.js 文件
- import {
-   Button, Table, Input, Form,
-   Select, Option
- } from 'iview'

- const components = {
-   'i-button': Button, 'i-col': Table, 'i-input': Input, 'i-form': Form,
-   'i-select': Select, 'i-option': Option
- }

- for (const key in components) {
-   Vue.component(key, components[key])
- }

// babel.config.js
- plugins: [
-   [
-     'import',
-     {
-       libraryName: 'iview',
-       libraryDirectory: 'src/components'
-     }
-   ]
- ]

// src/main.js
- import 'iview/dist/styles/iview.css' // iview样式
```

> 安装你想要的UI库并注意按需引入

## 预处理器
- 你可以在全局中使用任何src/style/mixins.less文件中的变量和混入以及函数
- 默认采用less, 如果想使用其他预处理器请参考
[style-resources-loader](https://www.npmjs.com/package/style-resources-loader)
[vue-cli-plugin-style-resources-loader](https://www.npmjs.com/package/vue-cli-plugin-style-resources-loader)
