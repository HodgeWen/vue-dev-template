import axios from 'axios'

const createInstance = ({ option = null, before, after } = {}) => {
  const instance = axios.create(option)
  before && instance.interceptors.request.use(before)
  after && instance.interceptors.response.use(after.success || (() => {}), after.fail || (() => {}))
  return instance
}

const commonConf = {
  before(config) {
    config.headers.authorization = sessionStorage.getItem('token')
    return config
  },
  after: {
    success(res) {
      // 自行配置
      return res.data
    },
    fail(err) {
      // 自行配置
      return err
    }
  }
}

// 可创建多个实例
export const httpSetting = createInstance(commonConf)