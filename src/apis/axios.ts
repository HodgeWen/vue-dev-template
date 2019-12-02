import axios, { AxiosRequestConfig, AxiosResponse, AxiosInterceptorManager, AxiosPromise } from 'axios'
import errTactics from './errTactics'
import { Res } from './types'

interface AxiosInstance {
  (config: AxiosRequestConfig): AxiosPromise;
  (url: string, config?: AxiosRequestConfig): AxiosPromise;
  defaults: AxiosRequestConfig;
  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>;
    response: AxiosInterceptorManager<AxiosResponse>;
  };
  getUri(config?: AxiosRequestConfig): string;
  request (config: AxiosRequestConfig): Promise<Res>;
  get<T = Record<string, any>>(url: string, config?: AxiosRequestConfig): Promise<Res<T>>;
  delete<T = Record<string, any>>(url: string, config?: AxiosRequestConfig): Promise<Res<T>>;
  head<T = Record<string, any>>(url: string, config?: AxiosRequestConfig): Promise<Res<T>>;
  post<T = Record<string, any>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<Res<T>>;
  put<T = Record<string, any>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<Res<T>>;
  patch<T = Record<string, any>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<Res<T>>;
}

type AxiosRes = AxiosResponse<Res> | Promise<AxiosResponse>
// 创建一个axios的实例
function create(config?: AxiosRequestConfig | undefined | null, interceptor: {
  before?: (value: AxiosRequestConfig) => AxiosRequestConfig | Promise<AxiosRequestConfig>;
  onOk?: (value: AxiosResponse<Res>) => AxiosRes | Res;
  onErr?: (error: any) => any;
} = {}) {
  const instance: AxiosInstance = axios.create({
    baseURL: '/lulu/mould-zs-api',
    timeout: 18000,
    ...config
  })

  let { before, onOk, onErr } = interceptor

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
