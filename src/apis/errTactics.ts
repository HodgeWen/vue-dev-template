import { Message } from 'element-ui'
import router from 'router/index'
import { Res } from './types'
const Msg = {
  didActived: false,

  err (message: string) {
    if (!message || this.didActived) return
    this.didActived = true
    Message.error({
      message,
      onClose: () => this.didActived = false
    })
  }
}

// 错误处理策略
export default {
  500 (data: Res) {
    Msg.err(data.msg)
    return data
  },

  400 () {
    Msg.err('请求异常')
    return {
      code: 400
    }
  },

  401 () {
    Msg.err('没有该操作的权限')
    router.replace({ name: 'login' })
    return {
      code: 401
    }
  },

  404 () {
    Msg.err('接口不存在')
    return {
      code: 404
    }
  },

  405 () {
    Msg.err('请求方法错误')
    return {
      code: 405
    }
  },

  408 () {
    Msg.err('请求超时')
    return {
      code: 408
    }
  }
}
