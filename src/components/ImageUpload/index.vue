<template>
  <v-upload v-if="srcType !== 'Array'" class="v-image-upload" ref="upload" v-bind="$attrs" :show-file-list="false">
    <div class="v-image-upload__imgbox" v-if="src" @click.stop>
      <img class="v-image-upload__img" :src="fileServer + '/' + src" alt="img" />
      <div class="v-image-upload__mask">
        <a :href="fileServer + '/' + src" class="el-icon-view" target="_blank" title="预览"></a>
        <i class="el-icon-refresh-right" @click="$refs.upload.select()" title="重新上传"></i>
      </div>
    </div>
    <i v-else class="v-image-upload__icon el-icon-upload2"></i>
  </v-upload>

  <div v-else class="v-images-upload">
    <div v-for="(item, index) of src" :key="item.path" class="v-images-upload__imgbox">
      <img :src="fileServer + '/' + item.path" alt="img">
      <i class="el-icon-close" @click="onDeleteImage(item.id, index)"></i>
    </div>
    <v-upload class="v-images-upload__button" ref="upload" v-bind="$attrs" :show-file-list="false">
      <i class="v-images-upload__icon el-icon-plus"></i>
    </v-upload>
  </div>
</template>

<script>
import {  } from 'apis/index'
export default {
  name: 'VImageUpload',

  inheritAttrs: false,

  props: {
    src: {
      type: [String, Array]
    },

    fileServer: {
      type: String,
      default: ''
    }
  },

  computed: {
    srcType() {
      return this.$getType(this.src)
    }
  },

  methods: {
    async onDeleteImage(id, index) {
      // let res = await deleteAttachment([id])
      if (res.code !== 200) return
      this.$msg.success('删除成功')
      this.$emit('delete', index)
    }
  }
}
</script>
