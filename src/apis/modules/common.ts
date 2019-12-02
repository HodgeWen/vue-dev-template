import { httpWithoutToken, httpWithToken } from '../axios.js'
import { sessionCache } from '../../cache.js'
import store from '../../store.js'
// 登录, 获取token
export const login = (data: {
  code: string;
  password: string;
}) => httpWithoutToken.post('/principal/login', data)

// 登出
export const logout = () => httpWithToken.get('/principal/logout')

// 获取人员信息 // 建议路径 /user/info
export const getUserInfo = () => httpWithToken.get('/user/info')

// 获取菜单
export const getMenus = () => httpWithToken.get('/menus')

// 数据字典查询分类
export const getDicts = async () => {
  const dicts = sessionCache.get('dicts')
  if (dicts) return store.commit('setDicts', dicts)
  const res = await httpWithToken.post('/dict/list/classify', {})
  if (res.code !== 200) return
  sessionCache.set('dicts', res.content)
  store.commit('setDicts', dicts)
}

