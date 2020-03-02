<template>
  <!-- 锁屏 -->
  <div>
    <v-icon type="lock" pointer @click="didLockDialogShow = true"/>
    <v-dialog width="400px" title="设置锁屏密码" v-model="didLockDialogShow" :confirm-method="onLock" @change="$resetFields('lock')">
      <el-form ref="lock" :rules="rules" label-width="80px" :model="form" @submit.native.prevent>
        <el-form-item size="medium" label="密码" prop="pwd">
          <el-input @keyup.native.enter="onLock" placeholder="输入锁屏密码" v-model="form.pwd" />
        </el-form-item>
      </el-form>
    </v-dialog>
  </div>
</template>

<script>
import { sessionCache } from '@/cache'
export default {
  data: () => ({
    didLockDialogShow: false,

    form: {
      pwd: ''
    },

    rules: {
      pwd: [
        { required: true, message: '请输入锁屏密码', trigger: 'blur' }
      ]
    }
  }),

  methods: {
    async onLock() {
      const valid = await this.$validate('lock')
      if (!valid) return false
      sessionCache.set('lock-info', {
        pwd: this.form.pwd,
        from: this.$route.name
      })
      this.$router.push({ name: 'lock' })
    }
  }
}
</script>
