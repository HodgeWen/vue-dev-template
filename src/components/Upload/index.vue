<template>
  <el-upload
    class="v-upload"
    ref="upload"
    v-bind="$attrs" 
    :on-success="afterSuccess"
    :on-change="afterChange"
    :on-error="afterError"
    :on-preview="afterPreview"
    :on-remove="afterRemove"
    :on-progress="inProgress"
    :headers="headers"
    :action="BASE_URL + action"
    :data="data"
    :show-file-list="showFileList"
  >
    <slot/>
  </el-upload>
</template>

<script>
import { BASE_URL, FILE_SERVER } from 'utils/constants'
import { sessionCache } from '@/cache'
export default {
  name: 'VUpload',

  inheritAttrs: false,

  props: {
    fileServer: {
      type: String,
      default: FILE_SERVER
    },

    action: {
      type: String,
      default: '/api-identity/sysAttachment/'
    },

    afterSuccess: Function,

    afterRemove: Function,

    afterError: Function,

    afterChange: Function,

    afterPreview: Function,

    inProgress: Function,

    showFileList: {
      type: Boolean,
      default: false
    },

    types: {
      type: Array,
      required: true,
      validator(val) {
        return val && val.length === 2
      }
    },

    id: {
      type: String,
      required: true
    },

    oldAttachmentId: {
      type: String
    }
  },

  data: () => ({
    BASE_URL
  }),

  computed: {
    headers() {
      return {
        authorization: sessionCache.get('token')
      }
    },

    data() {
      let { id, types, oldAttachmentId } = this
      if (!types.length) {
        return {}
      }
      let ret = {
        masterTableId: id,
        masterObject: types[0],
        attachmentType: types[1]
      }
      // 只有单选的情况可以删除旧的附件
      if (oldAttachmentId && !this.$attrs.multiple) {
        ret.deleteId = oldAttachmentId
      }
      return ret
    }
  },

  methods: {
    upload() {
      this.$refs.upload.submit()
    },

    select() {
      this.$refs.upload.$refs['upload-inner'].handleClick()
    }
  }
}
</script>
