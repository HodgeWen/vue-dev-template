# 项目开发规范

## 架构

### 介绍
本项目为网站后台项目.

### 模式
1.前后端分离开发模式
2.前端构建单页应用, 在客户端渲染(非服务端模板字符串那一套)
3.后端提供restful api

### 技术栈
1. 前端: Vue全家桶(vue, vue-router, vuex) + Eelement-UI
2. 后端:

## 通用规范

### 命名

- 类使用大驼峰命名法

``` 
// good
class UserGroup {}

// bad 
class userGroup {}
class usergroup {}
class user_group {}
```

- 函数和变量使用小驼峰命名法

```
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

```
// good
const BASE_URL = '/api'
```
- 使用语义化的英文命名

```
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

```
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

```
// good
const ENV = 'node'

// bad
let ENV = 'node' 
var ENV = 'node'
```

- 使用es6的声明关键字let和const

```
// good
let name = '张三'
const userType = 'client'

// bad
var name = '张三'
var userType = 'client'
```

### 赋值
- 赋值符号'=' 两侧必须加上空格

```
// good
const name = '张三'

// bad
const name='张三'
const name= '张三'
const name ='张三'
```

- 不要把不同类型的值赋值到变量上

```
// good
let str = '1'
str = '2'

// bad
let str = '1'
str = 1
```
- 声明变量的时候赋一个初始值

```
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
 500 |  服务端错误 |  为了方便后端调试错误, 可在返回的数据中加入具体的错误原因
200 |  请求成功  |  满足http协议, 同时后端能够做出相应的处理, 返回一个期望的数据格式.
400 |  错误的请求 | 请求方法不正确或请求的数据类型不正确
404 |  没有该接口  | 
401  |  没有访问权限 | 如果请求中没有携带token或者token无效(过期或者其他地方登陆刷新了服务器端的token)则返回401

- 请求成功(响应头中的响应码为200)后的code码
为了规范在请求成功后出现的不同行为, 我们给不同的行为赋予不同的标识code  
> 我们约定 success 为成功返回数据的标识, 约定 failed 为 未能成功返回数据的标识 

看下方的一段分页的 JSON格式的响应  

```
{
    "code": "success",
    "msg": "请求成功",
    "content": {
        "total": 117,
        "data": [
            { "name": "张三", "height": 175, "email": "xxx@xx.com", "id": "xxxxxxx" },
            { "name": "张三", "height": 175, "email": "xxx@xx.com", "id": "xxxxxxx" },
            { "name": "张三", "height": 175, "email": "xxx@xx.com", "id": "xxxxxxx" }
        ]
    }
}
```

> 我们约定, 因为一个错误的行为而导致失败时返回failed标识码
> 例如: 提交一个表单时缺少应有的字段(表单验证不通过), 查询一个不存在的id, 更新一条数据时数据版本不匹配(乐观锁)

下方是请求某个具体数据失败的响应, 注意这和请求列表不同, 请求列表可能是个空列表, 但应该始终返回一个成功标识.  
```
{
    "code": "failed",
    "msg": "未找到数据",
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

