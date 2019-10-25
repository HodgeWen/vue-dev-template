import { httpWithoutToken, httpWithToken } from '../axios'

// 登录, 获取token
export const login = params =>
  httpWithoutToken.post('/user/login', params)

// 登出
export const logout = () => httpWithToken.post('/user/logout')

// 获取人员信息 // 建议路径 /user/info
export const getUserInfo = () =>
  httpWithToken.get('/user/info')

// 获取菜单
export const getMenus = () =>
httpWithToken.get('/menus')