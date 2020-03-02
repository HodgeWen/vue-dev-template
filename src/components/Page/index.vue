<template>
  <div class="v-page" v-bind="$attrs">
    <template v-if="form">
      <div class="v-page__header">
        {{$route.meta.title}}
      </div>

      <div class="v-page__body">
        <slot />
      </div>

      
      <div class="v-page__footer">
        <slot v-if="$slots.footer" name="footer" />
        <template v-else>
          <el-button @click="$router.go(-1)">返回</el-button>
          <el-button type="primary" @click="$emit('submit')">确认</el-button>
        </template>
      </div>
    </template>

    <slot v-else />
  </div>
</template>

<script>
export default {
  name: 'VPage',

  inheritAttrs: false,

  props: {
    form: Boolean
  }
}
</script>
