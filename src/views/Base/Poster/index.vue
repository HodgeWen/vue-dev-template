<template>
  <v-page>
    <v-table is-list :columns="columns" action="/posters">
      <template #tools-right>
        <el-button type="primary" @click="_openDialog('create', '新增海报')">新增</el-button>
      </template>
    </v-table>

    <v-dialog v-model="dialog.visible" :title="dialog.title" width="750px">
      <el-form :model="form" class="el-form-grid-2" label-width="80px">
        <el-form-item label="hash">
          <el-input v-model="form.hash" />
        </el-form-item>

        <el-form-item label="名字">
          <el-input v-model="form.name" />
        </el-form-item>

        <el-form-item label="base64">
          <input type="file">
        </el-form-item>

        <el-form-item label="是否可用">
          <el-radio-group v-model="form.enabled">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="头像" class="avatar">
          <v-input type="number" v-model="form.avatar.left" placeholder="左边距" />
          <v-input type="number" v-model="form.avatar.top" placeholder="上边距" />
          <v-input type="number" v-model="form.avatar.size" placeholder="尺寸" />
        </el-form-item>

        <el-form-item label="昵称" class="nickname">
            <v-input type="number" v-model="form.nickname.left" placeholder="左边距" />
            <v-input type="number" v-model="form.nickname.top" placeholder="上边距" />
            <v-input type="number" v-model="form.nickname.size" placeholder="字体大小" />
            <el-input v-model="form.nickname.font" placeholder="字体" />
            <el-input v-model="form.nickname.color" placeholder="字体颜色" />
        </el-form-item>
      </el-form>
    </v-dialog>
  </v-page>
</template>

<script>
import dialog from 'mixins/dialog'
export default {
  mixins: [dialog],

  data: vm => ({
    columns: [
      { type: 'index', label: '#' },
      { label: '名称', prop: 'name' },
      { label: 'ghId', prop: 'ghId' },
      { label: 'appId', prop: 'appId' },
      { label: 'appSecret', prop: 'appSecret' },
      { label: 'token', prop: 'token' },
      { label: 'aesKey', prop: 'aesKey' },
      { label: 'templateId', prop: 'templateId' },
    ],

    form: {
      hash: '',
      name: '',
      base64: '',
      enabled: true,
      avatar: {
        left: null,
        top: null,
        size: null,
      },
      nickname: {
        left: null,
        top: null,
        size: null,
        font: '',
        color: ''
      }
    }
  })
}
</script>

<style lang="scss" scoped>
  .avatar, .nickname {
    & .el-input {
      width: 33%;
    }
  }
</style>