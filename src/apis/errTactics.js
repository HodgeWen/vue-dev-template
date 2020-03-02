import { Message } from 'element-ui'
import router from 'routes/index'
const Msg = {
  didActived: false,

  err (message) {
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
  500 (data) {
    Msg.err(data && data.msg || '服务器错误')
    return data || {
      code: 500
    }
  },

  400 (err) {
    Msg.err('请求异常')
    return {
      code: 400
    }
  },

  401 () {
    // Msg.err('登录过期或没有该操作的权限')
    // sessionStorage.clear()
    // router.currentRoute.name !== 'login' && router.replace({ name: 'login' })
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
  },

  504() {
    Msg.err('网关错误')
    return {
      code: 504
    }
  }
}
