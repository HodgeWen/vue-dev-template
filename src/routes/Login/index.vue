<template>
  <div class="main">
    <section class="login">
      <div style="text-align: right">
        <Language style="color: #fff" />
      </div>
      <p>{{$t('tip')}}</p>
      <el-form class="form" :model="form" :rules="rules" ref="form" @keyup.enter.native="onLogin">
        <el-form-item prop="userNo">
          <el-input
            :placeholder="$t('inputUserName')"
            prefix-icon="el-icon-user"
            v-model="form.userNo"
          />
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            :placeholder="$t('inputPassWord')"
            type="password"
            prefix-icon="el-icon-lock"
            v-model="form.password"
          />
        </el-form-item>
      </el-form>
      <v-button class="login-button" type="primary" :callback="onLogin">{{$t('login')}}</v-button>
    </section>
  </div>
</template>

<script>
import { sessionCache } from '@/cache'
import { login } from 'apis/index'
import Language from 'components/Language'
import i18n from './i18n'

export default {
  name: 'login',

  components: { Language },

  data: vm => ({
    form: {
      userNo: '', // 账号
      password: '' // 密码
    }
  }),

  i18n,

  computed: {
    rules() {
      return {
        userNo: [
          { required: true, message: this.$t('inputUserName'), trigger: 'blur' }
        ],
        password: [
          { required: true, message: this.$t('inputPassWord'), trigger: 'blur' }
        ]
      }
    }
  },

  methods: {
    // 登录
    async onLogin() {
      const valid = await this.$validate('form')
      if (!valid) return

      // const res = await login(this.form)
      // if (res.code !== 'success') return

      // sessionCache.set('token', res.content)
      sessionCache.set('token', 'token')
      this.$router.push({ name: 'layout' })
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
