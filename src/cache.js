import { Cache } from 'wts-utils'

export const localCache = Cache.create('localStorage')

export const sessionCache = Cache.create('sessionStorage')