import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import errTactics from './errTactics'
import { Res } from './types'

type AxiosRes = AxiosResponse<Res> | Promise<AxiosResponse>
// 创建一个axios的实例
function create(config?: AxiosRequestConfig | undefined | null, interceptor?: {
  before?: (value: AxiosRequestConfig) => AxiosRequestConfig | Promise<AxiosRequestConfig>;
  onOk?: (value: AxiosResponse<Res>) => AxiosRes | Res;
  onErr?: (error: any) => any;
}) {
  const instance = axios.create({
    baseURL: '/lulu/mould-zs-api',
    timeout: 18000,
    ...config
  })

  let { before, onOk, onErr } = interceptor || {}

  if (!onOk) {
    onOk = (res: AxiosResponse<Res>) => {
      let { data } = res
      if (data.code === 500) {
        return errTactics[data.code](data)
      }
      return data
    }
  }

  if (!onErr) {
    onErr = (err: {
      response: {
        status: 400 | 401 | 404 | 405;
      }
    }) => {
      let { response } = err
      let tactic = errTactics[response ? response.status : 408] 
      return tactic()
    }
  }

  // 请求拦截器
  before && instance.interceptors.request.use(before)

  // 响应拦截器
  instance.interceptors.response.use(onOk as (value: AxiosResponse<Res>) => AxiosRes, onErr)

  return instance
}

// 需要token的请求
export const httpWithToken = create(null, {
  before(config: AxiosRequestConfig) {
    config.headers.authorization = sessionStorage.getItem('token')
    return config
  }
})

// 无需token的请求
export const httpWithoutToken = create(null)
