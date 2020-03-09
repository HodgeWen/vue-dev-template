# 项目开发规范

## 架构

### 模式
1.前后端分离开发模式  
2.前端构建单页应用, 在客户端渲染
3.后端提供restful api
4.后端采用微服务的架构

### 技术栈
1. 前端: Vue全家桶(vue, vue-router, vuex) + Eelement-UI + 其他库(axios, wts-utils)
2. 后端: Spring Cloud

## 通用规范

### 命名

- 类使用大驼峰命名法

``` js
// good
class UserGroup {}

// bad 
class userGroup {}
class usergroup {}
class user_group {}
```

- 函数和变量使用小驼峰命名法

``` js
// good
function doSomething () {}
const doSomething = () => {}
let userName = '张三'

// bad
function DoSomething () {}
const dosomething = () => {}
const do_something = () => {}
let user_name = '张三'
```

- 全局常量使用 下划线链接全大写英文的命名法

``` js
// good
const BASE_URL = '/api'
```
- 使用语义化的英文命名

``` js
// 语义化体现在知道当前的变量的行为和属性
// good 
function getPackages () {} 
let didDialogShow = false
let canUserVisit = false 
let isStudent = true

// bad
function getPkgs () {} // 不方便读代码
let show  = false // 不知道这是个行为还是个动作, 目标对象是什么
let userVisit = false // 无法表达正确的语义, 是能否访问还是访问状态还是其他情况
```

### 缩进(如果前后端有自己的缩进方案则以前后端各自的缩进方案为准)

- 使用空格缩进

- 缩进大小为2个空格

### 前后端交互
后端提供的接口请务必使用restful的风格

``` js
// 获取某个资源使用get
// 新增某个资源使用post
// 删除某个资源使用delete
// 修改某个资源使用put
// good
http.get('/api/user/page') // 获取分页
http.get(`/api/user/${id}`) // 根据具体id获取数据
http.get('/api/user/list') // 获取所有列表
http.post('/api/user') // 新增
http.put(`/api/user/${id}`) // 根据具体id修改数据
http.delete(`/api/user/${id}`) // 删除某个具体id的数据
http.delete('/api/user', list) // 删除一些数据

```

### 注释
给代码适当地增加注释能有效增加可维护性

## JS规范
### 缩进
缩进使用2个空格

### 引号
除了引号嵌套之外, 所有的字符串以单引号包裹

``` js
// good
const str = 'string'
const str1 = " this varible is a 'string' "

// bad
const str = "string"
```

### 分号
表达式结尾不能接引号

### 声明

- 常量声明使用 const 关键字

``` js
// good
const ENV = 'node'

// bad
let ENV = 'node' 
var ENV = 'node'
```

- 使用es6的声明关键字let和const

``` js
// good
let name = '张三'
const userType = 'client'

// bad
var name = '张三'
var userType = 'client'
```

### 赋值
- 赋值符号'=' 两侧必须加上空格

``` js
// good
const name = '张三'

// bad
const name='张三'
const name= '张三'
const name ='张三'
```

- 不要把不同类型的值赋值到变量上

``` js
// good
let str = '1'
str = '2'

// bad
let str = '1'
str = 1
```
- 声明变量的时候赋一个初始值

``` js
// good
let num = 100
let str = ''

// bad 
let num
let str
```


### 其他
[Vue风格指南](https://cn.vuejs.org/v2/style-guide/)

## CSS规范

### 嵌套
- 选择器嵌套最大不能超过3层

``` css
/* good */
.selector3 {

}

/* bad */
.selector1 .selector2 .selector3 {

}

```

### 命名
参考通用部分

### 其他
[css规范指南(酌情参考)](https://wenhongjie.github.io/guide/guidecss.html)


# 接口规范

## 格式
普通数据后端一律返回JSON格式, 流数据务必在响应头中声明具体的contentType  
[MIME对照表, 一般后端的框架会自动集成](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Complete_list_of_MIME_types)

## 请求响应码

- 响应头中的响应码(常用的)

响应码 | 含义 | 备注
:----------- | :-----------: | -------
200 |  请求成功  |  满足http协议, 同时后端能够做出相应的处理, 返回一个期望的数据格式.
400 |  错误的请求 | 请求的数据不正确
401  |  没有访问权限 | 如果请求中没有携带token或者token无效(过期或者其他地方登陆刷新了服务器端的token)则返回401
404 |  接口不存在  | ——
405  |  请求方法错误 | ——
408  |  请求超时 | 默认等待时间为18000毫秒, 前端设置
500 |  服务端错误 |  为了方便后端调试错误, 可在返回的数据中加入具体的错误原因

- 请求成功(响应头中的响应码为200)后的code码
为了规范在请求成功后出现的不同行为, 我们给不同的行为赋予不同的标识code  

> 我们约定 200 为成功返回数据的标识, 约定 其他状态码 为 未能成功返回数据的标识 

看下方的一段分页的 JSON格式的响应  

``` json
{
    "code": 200,
    "msg": "请求成功",
    "content": {
        "total": 117,
        "data": [
            { "name": "张三", "height": 175, "email": "xxx@xx.com", "id": "xxxxxxx" },
            { "name": "张三", "height": 175, "email": "xxx@xx.com", "id": "xxxxxxx" },
            { "name": "张三", "height": 175, "email": "xxx@xx.com", "id": "xxxxxxx" },
            //...
        ]
    }
}
```

下方是请求失败的响应, 注意content应始终返回一个[零值](##零值)
``` json
{
    "code": 500,
    "msg": "服务不可用",
    "content": {}
}
```

## 响应体字段
响应体的通用性,一致性,决定了一个项目前后端的可维护性
> 我们约定, 所有的普通数据(除了流数据外), 必须返回三个字段, content, code, msg


字段 | 作用 | 备注
:----------- | :-----------: | -----------:
 code |  描述一个成功的请求其是否达到预期的效果  |  [参考请求响应码](##请求响应码)
 msg |  对code字段的行为, 结果的具体描述 | 添加成功/更新成功/保存失败,手机格式不正确
 content  |  数据具体内容  | 如果数据有对应的类型, 则应该返回那个类型的零值

## 零值
JS是一门动态类型语言, 在程序执行阶段才会检查数据的类型, 如果放任数据类型不管, 会为程序埋下**未知**的隐患

> 我们约定, 即使数据为空, 数组, 对象, 字符串也应当返回对应的零值

类型 | 零值 
:----------- | :-----------
数组  | []
对象 | {}
字符串 | ''     

## restful api
[参考](https://www.jianshu.com/p/a35bad7dbc54)

# 组件文档
所有的组件都以v前缀开头

## 按钮 Button  
该按钮继承了ElButton的所有方法和属性, 唯一的区别是, 在此按钮内部
声明了一个loading属性, 你不必在外部声明一个loading字段来控制按钮的加载状态,
以防止父组件过多的字段导致的心智负担

### 特有属性 Props

参数 | 说明 | 类型 | 可选值 | 默认值
:----------- | :----------- | :------- | :--------- | :-----------
callback | 执行的异步操作函数 | Function | - | - 

> 例子: 发起一个请求并阻止用户多次点击而发起多次请求

``` html
<template>
    <v-button :callback="submit" />
</template>
```

``` js
import { requestApi } from 'apis/index'
export default {
    methods: {
        async submit() {
            let res = await requestApi()
            if (res.code !== 200) return
            this.$msg.success('操作成功')
        }
    }
}
```

## 表格 VTable
VTable对element-ui的组件进行了二次封装, 更强大, 更易用
继承了Element Table的几乎所有方法和属性, 内嵌了工具栏和
element 分页, 增加键盘操作

### 特有属性 Props

参数 | 说明 | 类型 | 可选值 | 默认值
:----------- | :----------- | :------- | :--------- | :-----------
columns | [列配置项列表](###列配置项列表-column-configurations) | Array | - | []
page-size-list | 分页尺寸配置 | Array | - | [10, 20, 40]
height | 表格高度 | String | - | -
layout | 分页组件的组成元素 | String | - | "total, sizes, prev, pager, next, jumper"
no-page | 不显示分页 | Boolean | - | false
header-fix | 固定表头 | Boolean | - | true
size | 表格尺寸 | String | medium/small/large | -
action | 数据来源地址 | String | - | -
params | 请求的请求体 | Object | - | {}
placeholder | 空值占位符 | String | - | ——
no-reset | 无重置按钮 | Boolean | - | false
map-handler | 数据格式映射 | Function | - | -
hide-search-button | 隐藏搜索按钮, 默认情况下只要有查询条件就会有 | Boolean | - | false 

### 特有方法 Methods

方法名 | 参数 | 说明 
:----------- | :----------- | :------- 
fetch | - | 查询数据(分页/列表) 
delete | (index) (索引) | 删除对应索引的数据
update | (index, document) (索引, 新的文档对象或新的文档id) | 更对应索引的数据,并原地替换
increase | (document) (新的文档对象或新的文档id) | 新增一条数据, 并推入数组


### 列配置项列表 Column configurations

属性 | 类型 | 默认值 
:----------- | :----------- | :------- 
type | string | 同Element columns的type属性
label | string | 表头文字
prop | string | 需要显示的字段 支持prop1.prop2.prop3写法
deepProp | string | 需要显示的字段, 支持prop1.prop2.prop3写法, 未找到会返回一个placeholder占位符
render | Function | 自定义模板
formatter | Function | 同Element columns的formatter属性
operations | Function/Array | 生成操作按钮

> render operations formatter  三者同时存在只有一种能够生效, 优先级从左往右依次

> operations 是一个二维数组或者一个返回二维数组的函数, 其中第二维的数组的第一个元素是按钮名称, 第二个元素是注册到表格的事件, 如果是一个函数， 则函数的参数返回的是一个表格记录的对象

> 第三个元素可选, 如果有则会提供一个确认框, 该元素作为确认框的提示内容.

``` html
<template>
    <v-table 
        :columns="$data._columns" 
        action="/xxx/xxx/page" 
        ref="tabel"
        @view="onView"
        @edit="onEdit"
    />
</template>
```

``` js
export default {
    data: () => ({
        // 如果column不是动态的建议以_开头, Vue不会将其纳入观察对象中
        _columns: [
            { 
                label: '姓名',
                prop: 'name'
            },
            {
                label: '产品',
                deepProp: 'ProductTO.productname'
            },
            {
                label: '状态',
                render(h, { row, index }) {
                    return (
                        <span class={row.status}>{row.status}</span>
                    )
                }
            },
            {
                label: '操作',

                // operations: [['编辑', 'edit'], ['查看', 'view']],
                // or
                operations({ row }) {
                    if (row.status === 'FINISHED') {
                        return [['查看', 'view']]
                    }
                    return [['编辑', 'edit']]
                }
            }
        ]
    })
}

```


### 插槽 Slots
name | 说明
:----------- | :----------- 
tools-left | 左侧工具栏插槽
tools-right | 右侧工具栏插槽


## 页面 VPage

### 对扩展开放， 对修改关闭。  
如果一个页面有个性化的东西， 只需修改此组件即可。


## 对话框 VDialog
对话框属于非常常见的组件，我们不应该将过多的精力放在上面，因此二次封装了El的对话框组件， 更加易用。

### 特有属性 Props

参数 | 说明 | 类型 | 可选值 | 默认值
:----------- | :----------- | :------- | :--------- | :-----------
v-model | - | Boolean | true/false | false
view | 开启视图模式用来移除确认按钮等 | Boolean | true/false | false
cancel-text | 取消按钮的文本 | String | - | 取消
confirm-text | 确认按钮的文本 | String | - | 确定
confirm-method | 点击确认按钮后的回调，Mixin中有相关的方法可以直接使用 | Function | - | -

## 日历 VCalendar
El在最近的更新中增加了日历组件， 但是不能满足更多的需求， 比如个性化日历操作等等。

### 属性 Props

参数 | 说明 | 类型 | 可选值 | 默认值
:----------- | :----------- | :------- | :--------- | :-----------
week | 自定义周日到周六的文本 | Array<String> | - | ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
data | 定义一个月中每天的映射内容， 需要与render-day一起使用 | Object | - | -
render-day | 将data中的内容渲染到日历中 | Function | - | -


## 上传 VUpload
该组件与后端接口所需属性一致。

## 图片上传 VImageUpload
该组件与后端接口所需属性一致。

## 输入框 VInput
提供了默认值选项，其他属性和El一致。

## 选择器 VSelect
