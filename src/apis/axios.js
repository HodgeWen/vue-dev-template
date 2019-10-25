import axios from 'axios'
import errTactics from './errTactics'

// 创建一个axios的实例
function create(options = {}, interceptor = {}) {
  const instance = axios.create(options)

  const { before, onOk, onErr } = interceptor

  // 请求拦截器
  before && instance.interceptors.request.use(before)

  // 响应拦截器
  instance.interceptors.response.use(
    onOk || (res => res.data),
    onErr || (err => errTactics[err.response ? err.response.status : 408]())
  )

  return instance
}

// 需要token的请求
export const httpWithToken = create(
  {
    baseURL: '/icrs-api',
    timeout: 18000
  },
  {
    before(config) {
      config.headers.authorization = sessionStorage.getItem('token')
      return config
    }
  }
)

// 无需token的请求
export const httpWithoutToken = create(
  {
    baseURL: '/icrs-api',
    timeout: 18000
  }
)
