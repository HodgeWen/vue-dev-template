<template>
  <v-page>
    <v-table :custom-data="data" :columns="columns" no-reset>
      <template #tools-right>
        <el-button @click="_openDialog('create', '新增', {}, afterOpen)" type="primary">新增</el-button>
        <el-button @click="submit" type="primary">提交</el-button>
      </template>
    </v-table>

    <v-dialog
      v-model="dialog.visible"
      :title="dialog.title"
      width="750px"
      :confirm-method="create"
      @change="onDialogChange"
    >
      <el-form ref="form" :model="form" :rules="rules" class="el-form-grid-2" label-width="100px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="ghId" prop="ghId">
          <el-input v-model="form.ghId" />
        </el-form-item>
        <el-form-item label="appId" prop="appId">
          <el-input v-model="form.appId" />
        </el-form-item>
        <el-form-item label="appSecret" prop="appSecret">
          <el-input v-model="form.appSecret" />
        </el-form-item>
        <el-form-item label="token" prop="token">
          <el-input v-model="form.token" />
        </el-form-item>
        <el-form-item label="aesKey" prop="aesKey">
          <el-input v-model="form.aesKey" />
        </el-form-item>
        <el-form-item label="templateId" prop="templateId">
          <el-input v-model="form.templateId" />
        </el-form-item>
        <el-form-item label="是否可用">
          <el-radio-group v-model="form.enabled">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="活动id">
          <el-input v-model="form.activity" />
        </el-form-item>
        <el-form-item label="关注级别">
          <el-input type="number" v-model="form.level" />
        </el-form-item>

        <el-form-item label="域" style="width: 100%">
          <el-button style="margin-bottom: 10px" @click="increaseScope">增加</el-button>
          <div v-for="(item, index) in scopeList" :key="item.key" class="scope-item">
            <el-input placeholder="键" v-model="scopeList[index].scopeKey" />
            <el-input placeholder="值" v-model="scopeList[index].scopeVal" />
          </div>
        </el-form-item>
      </el-form>
    </v-dialog>
  </v-page>
</template>

<script>
import dialog from "mixins/dialog";
import { createAccount } from "apis/index";
export default {
  mixins: [dialog],

  data: vm => ({
    columns: [
      { label: "名称", prop: "name" },
      { label: "ghId", prop: "ghId" },
      { label: "appId", prop: "appId" },
      { label: "appSecret", prop: "appSecret" },
      { label: "token", prop: "token" },
      { label: "aesKey", prop: "aesKey" },
      { label: "templateId", prop: "templateId" },
      {
        label: "是否可用",
        formatter: ({ enabled }) => (enabled ? "是" : "否")
      },
      { label: "活动id", prop: "activity" }
    ],

    data: [],

    form: {
      name: "",
      ghId: "",
      appId: "",
      appSecret: "",
      token: "",
      aesKey: "",
      templateId: "",
      enabled: false,
      activity: "",
      level: null,
      scoped: {},
      links: {}
    },

    rules: {
      name: [{ required: true, message: "必填", trigger: "blur" }],
      ghId: [{ required: true, message: "必填", trigger: "blur" }],
      appId: [{ required: true, message: "必填", trigger: "blur" }],
      appSecret: [{ required: true, message: "必填", trigger: "blur" }],
      token: [{ required: true, message: "必填", trigger: "blur" }],
      aesKey: [{ required: true, message: "必填", trigger: "blur" }],
      templateId: [{ required: true, message: "必填", trigger: "blur" }]
    },

    scopeList: []
  }),

  methods: {
    afterOpen() {},

    // 提交之前先将域数组转化为json格式
    setScope() {
      const ret = {}
      this.scopeList.forEach(item => {
        ret[item.scopeKey] = item.scopeVal
      })
      this.scopeList = []
      this.form.scoped = ret
    },

    // 创建
    async create() {
      const valid = await this.$validate("form");
      if (!valid) return false;

      this.setScope()

      this.data.push(JSON.parse(JSON.stringify(this.form)));
    },

    // 提交
    async submit() {
      const res = await createAccount(this.data);
      if (res.code >= 300) return false;
      this.$router.go(-1);
    },

    increaseScope() {
      this.scopeList.push({
        scopeKey: "",
        scopeVal: ""
      });
    },

    onDialogChange(visible) {
      if (!visible) {
        this.$resetFields("form")
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.scope-item {
  @include flex(space-between, flex-start);

  &:not(:last-child) {
    margin-bottom: 4px;
  }
  & > * {
    width: 45%;
  }
}
</style>