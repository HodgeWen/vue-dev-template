import axios from 'axios'
import errTactics from './errTactics'
import { BASE_URL } from 'utils/constants'
// 创建一个axios的实例
function create(options, interceptor = {}) {
  const instance = axios.create({
    timeout: 18000,
    ...options,
    baseURL: options && options.baseURL ? `${BASE_URL}/${options.baseURL}` : `${BASE_URL}`
  })

  const { before, onOk, onErr } = interceptor

  // 请求拦截器
  if (before !== null) {
    instance.interceptors.request.use(before || function(config) {
      config.headers.authorization = sessionStorage.getItem('token')
      return config
    })
  }

  // 响应拦截器
  instance.interceptors.response.use(
    onOk ||
      (({ data }) => {
        return errTactics[data.code] ? errTactics[data.code](data) : data
      }),
    onErr || (err => {
      let { response } = err
      response ? errTactics[response.status](response.data) : errTactics[408]()
    })
  )

  return instance
}

export const httpDefault = create(null)

export const httpIdentity = create({
  baseURL: 'api-identity'
})

export const httpClient = create({
  baseURL: 'api-customer'
})

export const httpMould = create({
  baseURL: 'api-mould'
})

export const httpCasting = create({
  baseURL: 'api-casting'
})

// 无需token的请求 登录
export const httpWithoutToken = create({ headers: null }, {
  onOk({ data, status }) {
    if (data.code && errTactics[data.code]) {
      return errTactics[data.code](data)
    }
    return status === 200 ? { ...data, code: 200 } : errTactics[status](data)
  },
  before: null
})
