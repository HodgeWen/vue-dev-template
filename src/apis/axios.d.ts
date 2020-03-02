import { AxiosRequestConfig, AxiosPromise, AxiosInterceptorManager } from 'axios'
import { Res } from './modules.d/types'

interface AxiosInstance {
  (config: AxiosRequestConfig): AxiosPromise;
  (url: string, config?: AxiosRequestConfig): AxiosPromise;
  defaults: AxiosRequestConfig;
  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>;
    response: AxiosInterceptorManager<AxiosResponse>;
  };
  getUri(config?: AxiosRequestConfig): string;
  request<T = Record<string, any>>(config: AxiosRequestConfig): Res<T>;
  get<T = Record<string, any>>(url: string, config?: AxiosRequestConfig): Res<T>;
  delete<T = Record<string, any>>(url: string, config?: AxiosRequestConfig): Res<T>;
  head<T = Record<string, any>>(url: string, config?: AxiosRequestConfig): Res<T>;
  post<T = Record<string, any>>(url: string, data?: any, config?: AxiosRequestConfig): Res<T>;
  put<T = Record<string, any>>(url: string, data?: any, config?: AxiosRequestConfig): Res<T>;
  patch<T = Record<string, any>>(url: string, data?: any, config?: AxiosRequestConfig): Res<T>;
}

export declare const httpDefault: AxiosInstance

export declare const httpIdentity: AxiosInstance

export declare const httpMould: AxiosInstance

export declare const httpCasting: AxiosInstance

export declare const httpWithoutToken: AxiosInstance 