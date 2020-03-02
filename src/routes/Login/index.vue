<template>
  <div class="main">
    <section class="login">
      <p class="tip">后台管理系统</p>
      <el-form class="form" :model="form" :rules="rules" ref="form" @keyup.enter.native="onLogin">
        <el-form-item prop="username">
          <el-input placeholder="请输入账号" prefix-icon="el-icon-user" v-model="form.username" />
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            placeholder="请输入密码"
            type="password"
            prefix-icon="el-icon-lock"
            v-model="form.password"
          />
        </el-form-item>
      </el-form>
      <el-button :loading="loading" class="login-button" type="primary" @click="onLogin">登录</el-button>
    </section>
  </div>
</template>

<script>
import { sessionCache } from '@/cache'
import { } from 'apis/index'
import Language from 'components/Language'

export default {
  name: 'login',

  components: { Language },

  data: vm => ({
    loading: false,

    form: {
      username: '', // 账号
      password: '' // 密码
    },

    rules: {
      username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
      password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
    }
  }),

  methods: {
    // 登录
    async onLogin() {
      const valid = this.$validate('form')
      if (!valid) return

      // this.loading = true
      // const res = await login(this.form)
      // this.loading = false
      sessionCache.set('token', true)

      // if (res && res.code !== 200) return
      
      
      sessionCache.set('userInfo', this.$mergeSync({
        name: '',
        mobile: '',
        email: '',
        note: '',
        qrCode: ''
      }, { name: '用户' }))
      this.$router.push({ name: 'role' })
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  background-color: #2d3a4b;
  height: 100%;
  padding-bottom: 100px;
  @include flex(center, center);
}

.login {
  width: 400px;

  p {
    text-align: center;
    color: #ffffff;
    font-size: 26px;
  }

  .login-button {
    width: 100%;
    margin-top: 10px;
  }
}

.tip {
  padding: 20px 0;
}

.form::v-deep {
  .el-input__inner {
    background-color: rgba(0, 0, 0, 0.2);
    border-color: rgba(0, 0, 0, 0.1);
    &:focus {
      border-color: #409eff;
    }
  }

  .el-form-item.is-error .el-input__inner,
  .el-form-item.is-error .el-input__inner:focus {
    border-color: #f56c6c;
  }
}
</style>
