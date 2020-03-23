const isDev = process.env.NODE_ENV === 'development'

export const BASE_URL = isDev ? '/remote' : '/remote'
